import { AccountUser, SignUpControllerRequestType, SignUpControllerResponseType } from './objects'

export interface CreateAccount {
    create: (account: SignUpControllerRequestType, responsibleAccount: AccountUser) => Promise<SignUpControllerResponseType>
}

export interface AddAccountDB {
    create: (account: SignUpControllerRequestType) => Promise<SignUpControllerResponseType>
}

export interface CheckByEmail {
    checkByEmail(email: string): Promise<boolean>
}

export interface CheckPermission {
    check(id: number): Promise<boolean>
}