import {
  ExecutionContext,
  CallHandler,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable, tap } from 'rxjs'
import { IUser } from '../models/Iuser.model'

@Injectable()
export class UpdateInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<IUser>> {
    const ctx = GqlExecutionContext.create(context)
    return next.handle().pipe(
      tap((user) => {
        if (!user) {
          return
        }
        const res = ctx.getContext()
        res.res.setHeader('last-modified', user.updatedAt)

        console.log(res.res)
      }),
    )
  }
}
