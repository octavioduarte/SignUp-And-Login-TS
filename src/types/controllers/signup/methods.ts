import { SignUpControllerRequestType, SignUpControllerResponseType } from './objects'

export interface CreateAccount {
    create: (account: SignUpControllerRequestType, responsibleAccount: string) => Promise<SignUpControllerResponseType>
}

export interface AddAccountDB {
    create: (account: SignUpControllerRequestType) => Promise<SignUpControllerResponseType>
}

export interface CheckByEmail {
    checkByEmail(email: string): Promise<boolean>
}

export interface CheckPermission {
    check(tokenResponsibleAccount: string): Promise<boolean>
}