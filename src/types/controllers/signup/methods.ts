import { AccountUser, SignUpControllerRequestType, SignUpControllerResponseType } from './objects'

export interface CreateAccount {
    create: (account: SignUpControllerRequestType, userID: number) => Promise<SignUpControllerResponseType>
}

export interface AddAccountDB {
    create: (account: SignUpControllerRequestType) => Promise<SignUpControllerResponseType>
}

export interface CheckByEmail {
    checkByEmail(email: string): Promise<boolean>
}

export interface LoadUserByID {
    loadUserByID(id: number): Promise<AccountUser | null>
}