export type SignUpControllerRequestType = {
    email: string
    name: string
    password: string
    status_account: boolean
    type_account: string
}

export type SignUpControllerResponseType = {
    result: number
} & SignUpControllerRequestType


export const CodeErrors = {
    no_permission: 1
}