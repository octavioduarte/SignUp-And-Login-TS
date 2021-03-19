import {
    forbidden,
    CreateAccount,
    NoPermissionToRegisterNewUser,
    SignUpControllerRequestType,
    CodeErrors as code_errors,
    serverError,
    ok,
    Validation,
    badRequest,
    Controller
} from '../../src/types'

export class SignUpController implements Controller {
    constructor(
        private readonly createAccount: CreateAccount,
        private readonly validation: Validation
    ) { }

    async handle(request: SignUpControllerRequestType) {
        try {
            const responsibleAccount = request.token_responsible
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const { result, ...userData } = await this.createAccount.create(request, responsibleAccount)

            if (result) {
                switch (result) {
                    case code_errors.no_permission:
                        return forbidden(new NoPermissionToRegisterNewUser())
                    case code_errors.email_already_exists:
                    default:
                        return badRequest(new NoPermissionToRegisterNewUser())
                }
            }

            return ok(userData)
        } catch (error) {
            console.error("===>", error)
            return serverError(error)
        }
    }
}
