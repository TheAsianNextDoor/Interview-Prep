// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace Express {
  export interface Request {
    user: {
      id: string;
      userName: string;
      firstName: string;
      lastName: string;
    };
  }
}
