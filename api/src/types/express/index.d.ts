export {};

declare global {
  namespace Express {
    interface Request {
      userId?: Number;
      cleanBody?: any;
    }
  }
}
