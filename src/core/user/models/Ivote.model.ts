import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Vote {
  @Field()
  from: string

  @Field()
  to: string

  @Field()
  vote: number
}
