import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class IvoteResponse {
  @Field(() => String)
  message: string

  @Field(() => Int)
  statusCode: number
}
