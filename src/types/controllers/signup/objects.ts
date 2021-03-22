export type SignUpControllerRequestType = {
    created_by: number;
    email: string
    name: string
    password: string
    password_confirmation: string
    status: boolean
    type: number
}

export type SignUpControllerResponseType = {
    result: number
} & SignUpControllerRequestType


export type AccountUser = {
    id: number
} & SignUpControllerRequestType


export const CodeErrors = {
    email_already_exists: 2,
    no_permission: 1,
    user_responsible_for_registration_not_found: 3
}

export const TypesAccountID = {
    admin: 2,
    root: 3,
    simple: 1
}