import type { AuthenticatedUser } from "./modules/auth/dto/auth.dto"

declare global {
  namespace Express {
    export interface Request {
      user?: AuthenticatedUser
    }
  }
}
