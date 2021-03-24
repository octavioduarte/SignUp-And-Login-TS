export class UnauthorizedError extends Error {
  constructor(customMessage?: string) {
    super(customMessage ? customMessage : 'Unauthorized')
    this.name = 'UnauthorizedError'
  }
}
