import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { Role } from '../models/Iuser-role'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)

    const requiredRole = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getHandler(),
    ])

    if (!requiredRole) {
      return true
    }

    const { user } = ctx.getContext().req

    return requiredRole.some((role) => user.role?.includes(role))
  }
}
