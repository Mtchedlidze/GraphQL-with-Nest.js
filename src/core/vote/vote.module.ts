import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { UserModule } from '../user/user.module'
import { VoteResolver } from './vote.resolver'
import { VoteService } from './vote.service'

@Module({
  imports: [UserModule, DatabaseModule],
  providers: [VoteService, VoteResolver],
  exports: [VoteService, VoteResolver],
})
export class VoteModule {}
