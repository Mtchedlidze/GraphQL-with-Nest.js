import { Field, ObjectType } from '@nestjs/graphql'
import { IUser } from 'src/core/user/models/Iuser.model'

@ObjectType()
export class ILoginResponse {
  @Field()
  token: string

  @Field(() => IUser)
  user: IUser
}
