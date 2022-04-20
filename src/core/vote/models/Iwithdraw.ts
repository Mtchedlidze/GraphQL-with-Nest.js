import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class Iwithdraw {
  @Field()
  @IsString()
  from: string

  @Field()
  @IsString()
  to: string
}
