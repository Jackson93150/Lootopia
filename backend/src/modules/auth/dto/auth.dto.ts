import { Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class AuthenticatedUser {
  @Type(() => String)
  id!: string;

  @Type(() => Boolean)
  @IsBoolean()
  isAdmin!: boolean;
}
