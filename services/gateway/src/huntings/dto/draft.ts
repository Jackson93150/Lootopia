import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsArray,
    IsIn,
    Min,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class HuntingDraftDto {
    @IsNotEmpty()
    id_creator: string;
  
    @IsString()
    title: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsIn(['RA', 'carte'])
    type?: 'RA' | 'carte';
  
    @IsOptional()
    @IsBoolean()
    is_public?: boolean;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    fees: number = 0;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    participants_limit: number = 0;
  
    @IsOptional()
    @IsString()
    latitude?: string;
  
    @IsOptional()
    @IsString()
    longitude?: string;
  
    @Type(() => Number)
    @IsInt()
    @Min(0)
    duration_dig_again?: number;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    main_colors: string[] = ['#FFFFFF', '#000000'];

    @IsOptional()
    @IsString()
    id_chat?: string;
  
    @Type(() => Number)
    start_date?: number;
  
    @Type(() => Number)
    end_date?: number;
  }
  