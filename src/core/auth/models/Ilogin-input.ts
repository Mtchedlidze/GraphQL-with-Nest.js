import { IsString, MinLength, Matches } from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'
enum UserRole {
  user,
  admin,
  moderator,
}

@InputType()
export class LoginUserInput {
  @Field()
  @IsString()
  readonly nickname: string

  @Field()
  @IsString()
  password: string
}
