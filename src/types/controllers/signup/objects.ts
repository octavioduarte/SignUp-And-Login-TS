export type SignUpControllerRequestType = {
    created_by: number;
    email: string
    name: string
    password: string
    password_confirmation: string
    status: boolean
    type: number
}


export type AccountUserDB = {
    id: number
} & Omit<SignUpControllerRequestType, "password_confirmation">


export type AccountUserResponseHttp = Omit<AccountUserDB, "password">

export type ResultCreateUser = {
    result?: number
    user_data?: AccountUserResponseHttp
}


export const CodeErrorsSignUp = {
    email_already_exists: 2,
    no_permission: 1,
    user_responsible_for_registration_not_found: 3
}

export const TypesAccountID = {
    admin: 2,
    root: 3,
    simple: 1
}