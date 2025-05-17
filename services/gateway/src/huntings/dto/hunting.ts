import {
    IsBoolean,
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsArray,
    IsIn,
    Min,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class HuntingDto {
    @IsNotEmpty()
    id_creator: string;
  
    @IsString()
    title: string;
  
    @IsString()
    description: string;
  
    @IsIn(['RA', 'carte'])
    type?: 'RA' | 'carte';
  
    @IsBoolean()
    is_public: boolean;
  
    @Type(() => Number)
    @IsInt()
    @Min(0)
    fees: number = 0;
  
    @Type(() => Number)
    @IsInt()
    @Min(0)
    participants_limit: number = 0;
  
    @IsString()
    city: string;
  
    @IsString()
    country: string;
  
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
    start_date: number;
  
    @Type(() => Number)
    end_date: number;
  }
  