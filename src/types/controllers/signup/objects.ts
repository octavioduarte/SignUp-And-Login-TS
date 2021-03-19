export type SignUpControllerRequestType = {
    email: string
    name: string
    password: string
    status_account: boolean
    type_account: number
}

export type SignUpControllerResponseType = {
    result: number
} & SignUpControllerRequestType


export type AccountUser = {
    id: number
} & SignUpControllerRequestType


export const CodeErrors = {
    no_permission: 1
}

export const PermissionsID = {
    simple: 1,
    admin: 2,
    root: 3
}