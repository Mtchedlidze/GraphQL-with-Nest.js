import { Injectable } from '@nestjs/common'
import { HashService } from '../../utils/hash/hash.service'
import { UserRepository } from '../database/users.repository'
import { IcreateUser } from './models/IcreateUser.'
import { IFindAllArgs } from './models/IfindAll.args.dto'
import { IUser } from './models/Iuser.model'
import { NotCreateException } from './exceptions/NotCreate.exception'
import { IUpdateUser } from './models/IupdateUser'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  findAll(args: IFindAllArgs): Promise<IUser[]> {
    return this.userRepository.findAll(args)
  }

  findOne(nickname: string): Promise<IUser> {
    return this.userRepository.findOne(nickname)
  }

  async create(user: IcreateUser): Promise<IUser> {
    const userExists = await this.findOne(user.nickname)
    if (userExists) {
      throw new NotCreateException('User nickname is already taken')
    }
    const passowrd = await this.hashService.hashPassword(user.password)

    user.password = passowrd
    return this.userRepository.register(user)
  }

  async deleteOne(nickname: string) {
    const user = await this.findOne(nickname)
    if (!user || user.isDeleted) {
      throw new Error('user not found')
    }

    return this.userRepository.deleteOne(nickname)
  }

  async updateOne(nickname: string, updateoptions: Partial<IUpdateUser>) {
    const user = await this.findOne(nickname)
    if (!user) {
      throw new Error('user not found')
    }

    if (updateoptions && updateoptions.password) {
      const password = await this.hashService.hashPassword(
        updateoptions.password,
      )

      updateoptions.password = password
    }

    return this.userRepository.updateOne(nickname, updateoptions)
  }

  async editRating(nickname: string, value: number) {
    return this.userRepository.editRating(nickname, value)
  }

  async addAvatar(nickname: string, avatar: string) {
    const user = await this.findOne(nickname)
    if (!user || user.avatar) {
      return
    }
    return this.userRepository.addAvatar(nickname, avatar)
  }
}
