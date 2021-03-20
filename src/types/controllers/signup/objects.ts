export type SignUpControllerRequestType = {
    email: string
    name: string
    password: string
    password_confirmation: string
    status_account: boolean
    token_responsible: string;
    type_account: number
}

export type SignUpControllerResponseType = {
    result: number
} & SignUpControllerRequestType


export type AccountUser = {
    id: number
} & SignUpControllerRequestType


export const CodeErrors = {
    no_permission: 1,
    email_already_exists: 2
}

export const TypesAccountID = {
    simple: 1,
    admin: 2,
    root: 3
}