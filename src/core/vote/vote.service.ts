import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { VoteRepository } from '../database/votes.repository'
import { IaddVote } from './models/Ivote'
import { IeditVote } from './models/IeditVote'
import { NotVoteException } from './expections/notVote.expection'
import { Iwithdraw } from './models/Iwithdraw'

@Injectable()
export class VoteService {
  constructor(
    private readonly voteRepository: VoteRepository,
    private readonly userService: UserService,
  ) {}

  //#region hasvoted
  private async hasVoted(voteoptions: Partial<IaddVote>): Promise<boolean> {
    const { from, to } = voteoptions
    const hasVoted = await this.voteRepository.findVote(from, to)

    return hasVoted !== null
  }

  private async userExists(nickname: string) {
    const user = await this.userService.findOne(nickname)

    if (!user) {
      throw new NotVoteException('user not found')
    }
  }

  //#region isTimepassed
  private async isTimePassed(voteoptions: IaddVote) {
    const user = await this.userService.findOne(voteoptions.from)
    if (Date.now() - user.lastVoted > 3600000) {
      throw new NotVoteException('you cant vote untill 1 hour passes')
    }
    user.lastVoted = Date.now()
    await user.save()
  }
  //#endregion

  //#region addvote
  async addVote(voteoptions: IaddVote) {
    await this.userExists(voteoptions.to)
    const hasVoted = await this.hasVoted(voteoptions)
    if (hasVoted) {
      throw new NotVoteException('You can not vote twice to same user')
    }
    await this.isTimePassed(voteoptions)

    Promise.all([
      this.userService.editRating(voteoptions.to, voteoptions.vote),
      this.voteRepository.addVote(voteoptions),
    ])

    return ' your vote has been saved'
  }
  //#endregion

  //#region editvote
  async editVote(voteoptions: IeditVote) {
    const { from, to, vote } = voteoptions
    const existingVote = await this.voteRepository.findVote(from, to)

    if (!existingVote) {
      throw new NotVoteException('vote not found')
    }
    const { vote: previousValue } = existingVote

    if (vote === previousValue) {
      throw new NotVoteException('cannot vote twice to same user')
    }

    await Promise.all([
      await this.voteRepository.updateVote(voteoptions),
      await this.userService.editRating(to, vote),
    ])
    return 'your vote has been updated'
  }
  //#endregion

  //#region  withdraw
  async withDraw(withdrawoptions: Iwithdraw) {
    const hasVoted = await this.hasVoted(withdrawoptions)

    if (!hasVoted) {
      throw new NotVoteException('You have not voted yet')
    }
    const vote = await this.voteRepository.findVote(
      withdrawoptions.from,
      withdrawoptions.to,
    )
    if (!vote) {
      throw new NotVoteException('vote not found')
    }

    await Promise.all([
      this.userService.editRating(vote.to, vote.vote),
      this.voteRepository.withDraw(withdrawoptions),
    ])

    return 'your vote has been withdrawn'
  }
  //#endregion
}
