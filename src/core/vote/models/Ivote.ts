import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, Min, Max, NotEquals, IsString } from 'class-validator'

@InputType()
export class IaddVote {
  @Field()
  @IsNumber()
  @Max(1)
  @Min(-1)
  @NotEquals(0)
  vote: number

  @Field()
  @IsString()
  from: string

  @Field()
  @IsString()
  to: string
}
