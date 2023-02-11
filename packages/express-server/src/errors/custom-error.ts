export class CustomError extends Error {
  status: number;

  constructor(message = 'Something went wrong. Please try again.', status = 500) {
    super();

    this.message = message;
    this.status = status;
  }
}
