import { Type } from "class-transformer"
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator"

enum Role {
  COMMUN = "commun",
  PARTENAIRE = "partenaire",
  ADMIN = "admin",
}

enum Statut {
  ACTIF = "actif",
  BANNI = "banni",
  SUPPRIME = "supprimé",
}

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  username!: string

  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  email!: string

  @IsOptional()
  @IsString()
  @Type(() => String)
  biographie?: string

  @IsOptional()
  @IsString()
  @Type(() => String)
  logo_url?: string

  @IsOptional()
  @IsString()
  @Type(() => String)
  localisation?: string

  @IsInt()
  @Min(0)
  @Type(() => Number)
  solde: number

  @IsBoolean()
  @Type(() => Boolean)
  double_authentification: boolean

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  last_login?: Date

  @IsEnum(Role)
  @Type(() => String)
  role: Role = Role.COMMUN

  @IsInt()
  @Min(0)
  @Type(() => Number)
  xp: number

  @IsString()
  @Type(() => String)
  id_rang: string

  @IsOptional()
  @IsString()
  @Type(() => String)
  id_partenaire?: string

  @IsEnum(Statut)
  @Type(() => String)
  statut: Statut = Statut.ACTIF
}
