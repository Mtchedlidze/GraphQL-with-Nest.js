import { IsString, MinLength, IsOptional } from 'class-validator'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
class UpdateUser {
  @Field()
  @IsString()
  readonly name?: string

  @Field()
  @IsString()
  readonly surname?: string

  @Field()
  @MinLength(6)
  @IsString()
  password?: string
}

@InputType()
export class IUpdateUser extends PartialType(UpdateUser) {}
