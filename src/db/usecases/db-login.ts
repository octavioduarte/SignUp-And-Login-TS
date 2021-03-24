import {
    AccountUserDB,
    CodeErrorsLogin as code_errors_login,
    GenerateToken,
    HashComparer,
    LoadUserByCustomField,
    LoginControllerRequestType,
    MakeLogin,
    MakeLoginResponse
} from "../../types";

export class DbLogin implements MakeLogin {
    constructor(
        private readonly loadUser: LoadUserByCustomField,
        private readonly hashComparer: HashComparer,
        private readonly generateToken: GenerateToken

    ) { }
    async makeLogin(propsLogin: LoginControllerRequestType): Promise<MakeLoginResponse> {

        const user = await this.loadUser.loadUserByCustomField('email', propsLogin.email)

        if (!user) {
            return { result: code_errors_login.user_not_found }
        }

        const statusAccount: boolean = user.status

        if (!statusAccount) {
            return { result: code_errors_login.account_disabled }
        }

        const { password, ...user_data } = user as AccountUserDB

        const passwordMatches: boolean = await this.hashComparer.compare(propsLogin.password, password)

        if (!passwordMatches) {
            return { result: code_errors_login.invalid_credentials }
        }

        const access_token = await this.generateToken.generate(String(user_data.id))

        return { access_token, user_data }
    }
}