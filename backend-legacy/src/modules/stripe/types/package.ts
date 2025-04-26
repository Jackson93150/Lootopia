import { Type } from "class-transformer"
import { IsBoolean, IsInt, IsOptional, Min } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

export class CrownPackageDocument {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  montant_couronnes!: number

  @IsInt()
  @Min(0)
  @Type(() => Number)
  prix_euro!: number

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
