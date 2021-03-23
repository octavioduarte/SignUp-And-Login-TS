export class AccountDisabledError extends Error {
    constructor () {
        super("your account is disabled")
        this.name = 'AccountDisabledError'
      }
}