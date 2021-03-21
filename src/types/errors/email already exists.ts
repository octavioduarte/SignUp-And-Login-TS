export class EmailAlreadyExistsError extends Error {
    constructor () {
      super("this email is already being used")
      this.name = 'EmailAlreadyExistsError'
    }
  }
  