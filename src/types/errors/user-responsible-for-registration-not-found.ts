export class UserResponsibleForRegistrationNotFoundError extends Error {
    constructor () {
      super("user responsible for registration not found")
      this.name = 'UserResponsibleForRegistrationNotFoundError'
    }
  }
  