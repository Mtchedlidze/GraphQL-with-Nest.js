import { Injectable, Logger } from '@nestjs/common'
import { UserService } from 'src/core/user/user.service'
import { JwtService } from '@nestjs/jwt'
import { HashService } from '../../utils/hash/hash.service'
import { LoginUserInput } from './models/Ilogin-input'
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async validate(nickname: string, password: string): Promise<string> {
    const user = await this.userService.findOne(nickname)
    if (!user) {
      return
    }

    const [userPass, salt] = user.password.split('.')

    const pass = await this.hashService.hashPassword(password, salt)

    if (pass !== [userPass, salt].join('.')) {
      return
    }

    const payload = {
      nickname: nickname,
      role: user.role,
    }

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
      secret: process.env.SECRET,
    })

    return token
  }

  async login(loginUserInput: LoginUserInput) {
    const token = await this.validate(
      loginUserInput.nickname,
      loginUserInput.password,
    )

    if (token) {
      const user = await this.userService.findOne(loginUserInput.nickname)
      return {
        token,
        user,
      }
    }
  }
}
