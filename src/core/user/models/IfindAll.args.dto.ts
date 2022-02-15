import { IsNumber, IsOptional } from 'class-validator'

export class IFindAllArgs {
  @IsNumber()
  @IsOptional()
  skip?: number

  @IsNumber()
  @IsOptional()
  limit?: number
}
