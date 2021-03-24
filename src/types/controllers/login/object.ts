import { AccountUserDB } from "../signup"

export type LoginControllerRequestType = {
    email: string
    password: string
}

export type MakeLoginResponse = {
    access_token?: string
    result?: number
    user_data?: Omit<AccountUserDB,
        "password" |
        "password_confirmation"
    >
}



export const CodeErrorsLogin = {
    account_disabled: 3,
    invalid_credentials: 1,
    user_not_found: 2
}