import { HttpCode, HttpException, HttpStatus } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { VoteException } from './expections/vote.expection'
import { IeditVote } from './models/IeditVote'
import { IaddVote } from './models/Ivote'
import { IvoteResponse } from './models/IvoteResponse'
import { Iwithdraw } from './models/Iwithdraw'
import { VoteService } from './vote.service'

@Resolver('votes')
export class VoteResolver {
  constructor(private readonly voteService: VoteService) {}

  @Mutation(() => IvoteResponse, { nullable: true })
  @HttpCode(200)
  async addVote(@Args('voteoptions') voteoptions: IaddVote) {
    try {
      const response = await this.voteService.addVote(voteoptions)
      return new VoteException({
        message: response,
        statusCode: 200,
      }).generate()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Mutation(() => IvoteResponse, { nullable: true })
  @HttpCode(200)
  async updateVote(@Args('updatevoteoptions') voteoptions: IeditVote) {
    try {
      const response = await this.voteService.editVote(voteoptions)

      return new VoteException({
        message: response,
        statusCode: 200,
      }).generate()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Mutation(() => IvoteResponse, { nullable: true })
  @HttpCode(200)
  async withDrawVote(@Args('widthdrawoptions') withdrawoptions: Iwithdraw) {
    try {
      const response = await this.voteService.withDraw(withdrawoptions)
      return new VoteException({
        message: response,
        statusCode: 200,
      }).generate()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
