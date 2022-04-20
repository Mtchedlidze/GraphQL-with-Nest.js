import { forwardRef, Module } from '@nestjs/common'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { DatabaseModule } from '../database/database.module'
import { HashModule } from '../../utils/hash/hash.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [DatabaseModule, HashModule, forwardRef(() => AuthModule)],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
