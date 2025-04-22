import { Type } from "class-transformer"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

enum NotificationType {
  EMAIL = "email",
  PUSH = "push",
}

export class NotificationDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  message!: string

  @IsNotEmpty()
  @IsEnum(NotificationType)
  @Type(() => String)
  type!: NotificationType

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_utilisateur!: string
}

export const NotificationConverter = createConverter(NotificationDocument)
