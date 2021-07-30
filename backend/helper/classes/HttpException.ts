export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class ErrorResponse extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}
