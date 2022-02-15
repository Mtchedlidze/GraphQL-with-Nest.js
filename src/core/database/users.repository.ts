import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { IcreateUser } from 'src/core/user/models/IcreateUser.'
import { IFindAllArgs } from 'src/core/user/models/IfindAll.args.dto'
import { IUser } from '../user/models/Iuser.model'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { IUpdateUser } from '../user/models/IupdateUser'

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: SoftDeleteModel<IUser>,
  ) {}

  async findAll(args: IFindAllArgs): Promise<IUser[]> {
    return this.userModel.find().skip(args.skip).limit(args.limit)
  }

  async findOne(nickname: string): Promise<IUser> {
    return this.userModel.findOne({ nickname })
  }

  async register(user: IcreateUser): Promise<IUser> {
    return this.userModel.create(user)
  }

  async deleteOne(nickname: string): Promise<{ deleted: number }> {
    return this.userModel.softDelete({ nickname })
  }

  async updateOne(
    nickname: string,
    updateoptions: Partial<IUpdateUser>,
  ): Promise<IUser> {
    const user = await this.findOne(nickname)
    Object.assign(user, updateoptions)
    return user.save()
  }

  async editRating(nickname: string, value: number) {
    const user = await this.findOne(nickname)
    user.rating += -value
    return user.save()
  }

  async addAvatar(nickname: string, avatar: string) {
    return this.userModel.updateOne({ nickname }, { avatar })
  }
}
