import { instanceToPlain, plainToInstance } from "class-transformer"
import { type ValidationError, validateSync } from "class-validator"
import type { QueryDocumentSnapshot } from "firebase-admin/firestore"

export function formatValidationErrors(errors: ValidationError[]): string {
  return errors
    .map(error => {
      const constraints = error.constraints ? Object.values(error.constraints).join(", ") : "Unknown validation error"
      return `${error.property}: ${constraints}`
    })
    .join("; ")
}

export function createConverter<T extends object>(cls: new () => T) {
  return {
    toFirestore(document: T) {
      const instance = plainToInstance(cls, document)
      const errors = validateSync(instance)

      if (errors.length > 0) {
        throw new Error(`Validation failed: ${JSON.stringify(errors)}`)
      }

      return instanceToPlain(instance)
    },

    fromFirestore(snapshot: QueryDocumentSnapshot) {
      const data = snapshot.data()
      const instance = plainToInstance(cls, data)
      const errors = validateSync(instance)

      if (errors.length > 0) {
        throw new Error(`Validation failed on retrieved data: ${formatValidationErrors(errors)}`)
      }

      return instance
    },
  }
}
