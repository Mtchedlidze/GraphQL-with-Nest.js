import {
  HttpException,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { AuthService } from '../auth/auth.service'
import { Roles } from '../auth/decorators/roles.decorator'
import { GqlAuthGuard } from '../auth/guards/gqlAuth.guard'
import { GqlLocalAuthGuard } from '../auth/guards/gqlLocalAuth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { LoginUserInput } from '../auth/models/Ilogin-input'
import { ILoginResponse } from '../auth/models/Ilogin-response'
import { Role } from '../auth/models/Iuser-role'
import { IcreateUser } from './models/IcreateUser.'
import { IUpdateUser } from './models/IupdateUser'
import { Delete } from './models/Idelete.input'
import { IUser } from './models/Iuser.model'
import { UserService } from './user.service'
import { VoteResolver } from '../vote/vote.resolver'
import { UpdateInterceptor } from './interceptors/update.interceptor'

@Resolver('users')
export class UserResolver implements UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  //#region findall
  @Query(() => [IUser!], { name: 'users' })
  async findAll(
    @Args('skip', { nullable: true }) skip: number,
    @Args('limit', { nullable: true }) limit: number,
  ): Promise<IUser[]> {
    const users = await this.userService.findAll({ skip, limit })
    return users
  }

  //#region  findOne
  @Query(() => IUser!, { name: 'user', nullable: true })
  async findOne(@Args('nickname') nickname: string): Promise<IUser> {
    const user = await this.userService.findOne(nickname)
    return user
  }

  //#region create
  @Mutation(() => IUser, { name: 'register' })
  async create(@Args('user') user: IcreateUser): Promise<IUser> {
    try {
      return await this.userService.create(user)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  //#region login
  @Mutation(() => ILoginResponse, { nullable: true })
  @UseGuards(GqlLocalAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<ILoginResponse> {
    return this.authService.login(loginUserInput)
  }

  //#region  delete
  @Mutation(() => Delete)
  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async delete(
    @Args('nickname') nickname: string,
  ): Promise<{ deleted: number }> {
    try {
      return await this.userService.deleteOne(nickname)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  //#region  update
  @Mutation(() => IUser)
  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @UseInterceptors(new UpdateInterceptor())
  async update(
    @Args('nickname', { nullable: true }) nickname: string,
    @Args('updateoptions', { nullable: true })
    updateoptions: IUpdateUser,
  ) {
    try {
      return await this.userService.updateOne(nickname, updateoptions)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
