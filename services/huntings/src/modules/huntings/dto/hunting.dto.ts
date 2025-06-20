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
    ValidateIf,
} from "class-validator"

export class HuntingDto {
    @IsNotEmpty()
    @IsString()
    id_creator: string

    @ValidateIf((o) => !o.is_draft)
    @IsNotEmpty()
    @IsString()
    title?: string

    @ValidateIf((o) => !o.is_draft)
    @IsNotEmpty()
    @IsString()
    description?: string

    @ValidateIf((o) => !o.is_draft)
    @IsNotEmpty()
    @IsIn(["RA", "carte"])
    type?: "RA" | "carte"

    @IsOptional()
    @IsBoolean()
    is_public?: boolean

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    fees?: number

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    participants_limit?: number

    @ValidateIf((o) => !o.is_draft)
    @IsNotEmpty()
    @IsString()
    latitude?: string

    @ValidateIf((o) => !o.is_draft)
    @IsNotEmpty()
    @IsString()
    longitude?: string

    @ValidateIf((o) => !o.is_draft)
    @IsNotEmpty()
    @Type(() => Number)
    start_date?: number

    @ValidateIf((o) => !o.is_draft)
    @IsNotEmpty()
    @Type(() => Number)
    end_date?: number

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    indices?: string[]

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    enigmes?: string[]

    @IsOptional()
    @IsBoolean()
    is_draft?: boolean = false

    @IsOptional()
    @IsBoolean()
    state?: boolean = true
}
