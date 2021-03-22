import {
    forbidden,
    CreateAccount,
    NoPermissionToRegisterNewUser,
    EmailAlreadyExistsError,
    SignUpControllerRequestType,
    CodeErrors as code_errors,
    serverError,
    ok,
    Validation,
    badRequest,
    Controller,
    UserResponsibleForRegistrationNotFoundError,
    HttpResponse
} from '../../src/types'

export class SignUpController implements Controller {
    constructor(
        private readonly createAccount: CreateAccount,
        private readonly validation: Validation
    ) { }

    async handle(request: SignUpControllerRequestType): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const { created_by } = request
            const { result, ...userData } = await this.createAccount.create(request, created_by)

            if (result) {
                switch (result) {
                    case code_errors.no_permission:
                        return forbidden(new NoPermissionToRegisterNewUser())
                    case code_errors.email_already_exists:
                        return badRequest(new EmailAlreadyExistsError())
                    case code_errors.user_responsible_for_registration_not_found:
                        return badRequest(new UserResponsibleForRegistrationNotFoundError()) 
                    default:
                        return serverError(new Error())
                }
            }

            return ok(userData)
        } catch (error) {
            return serverError(error)
        }
    }
}
