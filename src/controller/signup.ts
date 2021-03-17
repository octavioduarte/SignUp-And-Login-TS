import { SignUpControllerRequestType, CreateAccount } from "../types/signup";

export class SignUpController {
    constructor(
        private readonly createAccount: CreateAccount 
    ){}

    async handle(request: SignUpControllerRequestType) {
        await this.createAccount.create(request)
        return request
    }
}
