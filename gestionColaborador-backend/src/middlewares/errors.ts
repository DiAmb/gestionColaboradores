export class CustomError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "CustomError";
    this.statusCode = statusCode;
  }
}

export function error(message: string, code?: number): CustomError {
  return new CustomError(message, code);
}
