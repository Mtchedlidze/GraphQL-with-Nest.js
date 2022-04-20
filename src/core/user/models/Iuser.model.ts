import { Field, ObjectType, Int } from '@nestjs/graphql'
import { Document } from 'mongoose'

@ObjectType()
export class IUser extends Document {
  @Field(() => String)
  _id: String

  @Field(() => String)
  name: string

  @Field(() => String)
  surname: string

  @Field(() => String)
  nickname: string

  @Field(() => String)
  role: string

  @Field(() => Boolean)
  isDeleted: boolean

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Date, { nullable: true })
  deletedAt: Date

  @Field(() => Int)
  lastVoted: number

  @Field(() => String)
  password?: string

  @Field(() => String)
  salt?: string

  @Field(() => Int)
  rating: number

  @Field(() => String)
  avatar: string
}
