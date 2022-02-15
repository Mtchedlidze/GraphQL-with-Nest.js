import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IaddVote } from '../vote/models/Ivote'
import { Vote } from '../user/models/Ivote.model'
import { Iwithdraw } from '../vote/models/Iwithdraw'

@Injectable()
export class VoteRepository {
  constructor(@InjectModel('Vote') private readonly voteModel: Model<Vote>) {}

  async addVote(voteoptions: IaddVote): Promise<void> {
    this.voteModel.create(voteoptions)
  }

  async findVote(from: string, to: string): Promise<Vote> {
    return this.voteModel.findOne({ from, to })
  }

  async updateVote(voteoptions: IaddVote): Promise<void> {
    const { from, to } = voteoptions
    const vote = await this.voteModel.findOne({ from, to })

    vote.vote = voteoptions.vote
    await vote.save()
  }

  async withDraw(withdrawoptions: Iwithdraw): Promise<void> {
    const { from, to } = withdrawoptions
    await this.voteModel.deleteOne({ from, to })
  }
}
