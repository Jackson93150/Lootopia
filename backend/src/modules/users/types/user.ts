import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { createConverter } from '../../firebase/firestore.convertor';

export class UserDocument {
  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  username!: string;
}

export const UserConverter = createConverter(UserDocument);
