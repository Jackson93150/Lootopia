import { plainToInstance, instanceToPlain } from 'class-transformer';
import { validateSync, type ValidationError } from 'class-validator';
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore';

export function formatValidationErrors(errors: ValidationError[]): string {
  return errors
    .map((error) => {
      const constraints = error.constraints
        ? Object.values(error.constraints).join(', ')
        : 'Unknown validation error';
      return `${error.property}: ${constraints}`;
    })
    .join('; ');
}

export function createConverter<T extends object>(cls: new () => T) {
  return {
    toFirestore(document: T) {
      const errors = validateSync(document);

      if (errors.length > 0) {
        throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
      }

      return instanceToPlain(document);
    },

    fromFirestore(snapshot: QueryDocumentSnapshot) {
      const document = plainToInstance(cls, snapshot.data());
      const errors = validateSync(document);

      if (errors.length > 0) {
        throw new Error(
          `Validation failed on retrieved data: ${formatValidationErrors(errors)}`,
        );
      }

      return document;
    },
  };
}
