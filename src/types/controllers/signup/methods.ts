import {
    AccountUserDB,
    ResultCreateUser,
    SignUpControllerRequestType,
    SignUpSaveDB,
} from './objects'


export interface CreateAccount {
    create: (account: SignUpControllerRequestType, userID: number) => Promise<ResultCreateUser>
}

export interface GetUserByToken {
    getUserByToken(token_user: string): Promise<AccountUserDB>
}

export interface SaveUserDB {
    saveUserDB: (account: SignUpSaveDB) => Promise<AccountUserDB>
}

export interface CheckByEmail {
    checkByEmail(email: string): Promise<boolean>
}

export interface LoadUserByID {
    loadUserByID(id: number): Promise<AccountUserDB | null>
}

export interface LoadUserByCustomField {
    loadUserByCustomField(fieldName: string, fieldValue: any): Promise<AccountUserDB | null>
}