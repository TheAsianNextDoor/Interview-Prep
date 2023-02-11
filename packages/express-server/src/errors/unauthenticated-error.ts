import { CustomError } from './custom-error';

export class UnauthenticatedError extends CustomError {
  constructor(message = 'No user found') {
    super(message, 401);
  }
}
