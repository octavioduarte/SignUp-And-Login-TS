export class NoPermissionToRegisterNewUser extends Error {
    constructor () {
      super("You dont have permission to register a new user ")
      this.name = 'NoPermissionToRegisterNewUser'
    }
  }
  