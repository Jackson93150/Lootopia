import { Type } from "class-transformer"
import { IsBoolean, IsInt, IsOptional, Min } from "class-validator"

import { createConverter } from "../../../firebase/firestore.convertor"

export class CrownPackageDocument {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  crown_amount!: number

  @IsInt()
  @Min(0)
  @Type(() => Number)
  price_euro!: number

  @IsBoolean()
  @Type(() => Boolean)
  promotion: boolean

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  promotion_price?: number
}

export const CrownPackageConverter = createConverter(CrownPackageDocument)
