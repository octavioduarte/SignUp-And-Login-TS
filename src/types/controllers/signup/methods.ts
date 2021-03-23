import {
    AccountUserDB,
    ResultCreateUser,
    SignUpControllerRequestType,
} from './objects'


export interface CreateAccount {
    create: (account: SignUpControllerRequestType, userID: number) => Promise<ResultCreateUser>
}



export interface SaveUserDB {
    saveUserDB: (account: SignUpControllerRequestType) => Promise<AccountUserDB>
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