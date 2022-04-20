import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Delete {
  @Field()
  deleted: number
}
