import { Type } from "class-transformer"
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from "class-validator"
import { createConverter } from "src/firebase/firestore.convertor"

export class HuntingDocument {
  @IsNotEmpty()
  @IsString()
  id_creator: string

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

  @IsOptional()
  @Type(() => Number)
  start_date?: number

  @IsOptional()
  @Type(() => Number)
  end_date?: number

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  indices: string[] = []

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  enigmes: string[] = []

  @IsOptional()
  @IsString()
  id_chat?: string

  @Type(() => Number)
  @IsInt()
  duration_dig_again?: number = 180

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  main_colors: string[] = ["#FFFFFF", "#000000"]

  @IsBoolean()
  is_draft: boolean = false

  @IsOptional()
  @IsBoolean()
  state: boolean = true
}

export const HuntingConverter = createConverter(HuntingDocument)
