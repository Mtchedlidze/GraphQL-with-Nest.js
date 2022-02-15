import { InputType } from '@nestjs/graphql'
import { IaddVote } from './Ivote'

@InputType()
export class IeditVote extends IaddVote {}
