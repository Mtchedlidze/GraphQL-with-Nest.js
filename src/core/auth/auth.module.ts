import { forwardRef, Module } from '@nestjs/common'
import { HashModule } from 'src/utils/hash/hash.module'
import { UserModule } from 'src/core/user/user.module'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    forwardRef(() => UserModule),
    HashModule,
    PassportModule,
    JwtModule.register({ secret: process.env.SECRET }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
