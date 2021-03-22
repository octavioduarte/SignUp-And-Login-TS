import { AccountUser } from "../signup"

export type LoginControllerRequestType = {
    email: string
    password: string
}

export type MakeLoginResponse = {
    result: number
} &
    Omit<AccountUser,
        "password" |
        "password_confirmation"
    >


export const CodeErrorsLogin = {
    invalid_credentials: 1
}