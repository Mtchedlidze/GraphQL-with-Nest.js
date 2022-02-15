import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import UserSchema from './schemas/user-schema'
import VoteSchema from './schemas/vote-schema'
import { UserRepository } from './users.repository'
import { VoteRepository } from './votes.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Vote', schema: VoteSchema },
    ]),
  ],
  providers: [UserRepository, VoteRepository],
  exports: [UserRepository, VoteRepository],
})
export class DatabaseModule {}
