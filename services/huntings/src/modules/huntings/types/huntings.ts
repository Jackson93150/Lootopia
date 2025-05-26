import { Type } from "class-transformer"
import { IsArray, IsBoolean, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator"
import { createConverter } from "src/firebase/firestore.convertor"

export class HuntingDocument {
  @IsNotEmpty()
  id_creator: string

  @IsString()
  @IsBoolean()
  is_draft!: boolean

  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsIn(["RA", "carte"])
  type?: "RA" | "carte"

  @IsOptional()
  @IsBoolean()
  is_public?: boolean

  @Type(() => Number)
  @IsInt()
  @Min(0)
  fees = 0

  @Type(() => Number)
  @IsInt()
  @Min(0)
  participants_limit = 0

  @IsOptional()
  @IsString()
  latitude?: string

  @IsOptional()
  @IsString()
  longitude?: string

  @Type(() => Number)
  @IsInt()
  duration_dig_again?: number = 180

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  main_colors: string[] = ["#FFFFFF", "#000000"]

  @IsOptional()
  @IsString()
  id_chat?: string

  @IsOptional()
  @Type(() => Number)
  start_date?: number

  @IsOptional()
  @Type(() => Number)
  end_date?: number
}

export const HuntingConverter = createConverter(HuntingDocument)
