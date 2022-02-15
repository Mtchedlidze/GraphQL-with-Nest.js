import { IsString, MinLength, Matches } from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'
enum UserRole {
  user,
  admin,
  moderator,
}
const match = `^${Object.values(UserRole)
  .filter((v) => typeof v !== 'number')
  .join('|')}$`

@InputType()
export class IcreateUser {
  @Field()
  @IsString()
  readonly name: string

  @Field()
  @IsString()
  readonly surname: string

  @Field()
  @MinLength(4)
  @IsString()
  readonly nickname: string

  @Field()
  @MinLength(6)
  @IsString()
  password: string

  @Field()
  @IsString()
  @Matches(match, 'i')
  readonly role: string
}
