export default class AppError {
  statusCode: number
  message: string

  constructor(message: string, statusCode: number = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}