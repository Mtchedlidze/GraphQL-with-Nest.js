import { SetMetadata } from '@nestjs/common'
import { Role } from '../models/Iuser-role'
export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles)
