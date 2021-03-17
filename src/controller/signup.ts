import 
    {   SignUpControllerRequestType,
        CreateAccount,
        CodeErrors as code_errors 
} from "../types/controllers/signup";
import { forbidden } from "../types/helpers/response-http";
import { NoPermissionToRegisterNewUser } from "../types/errors/no-permission-to-register-new-user";

export class SignUpController {
    constructor(
        private readonly createAccount: CreateAccount 
    ){}

    async handle(request: SignUpControllerRequestType) {
        const result = await this.createAccount.create(request)
        if (result.result === code_errors.no_permission) {
            return forbidden(new NoPermissionToRegisterNewUser())
        }
        return result
    }
}
