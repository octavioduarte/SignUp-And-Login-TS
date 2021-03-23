import {
    AccountUser,
    CheckByEmail,
    CreateAccount,
    SignUpControllerRequestType,
    SignUpControllerResponseType,
    LoadUserByID,
    LoadUserByCustomField
} from "../types";
import { SQLHelper } from "./helpers";

export class AccountRepository implements CreateAccount, CheckByEmail, LoadUserByID, LoadUserByCustomField {

    async create(account: SignUpControllerRequestType): Promise<SignUpControllerResponseType> {
        const accountRepository = SQLHelper.getRepository('Accounts')
        const user = await accountRepository.save(account)
        return {
            result: 0,
            ...user
        }
    }

    async checkByEmail(email: string): Promise<boolean> {
        const accountCollection = SQLHelper.getRepository('Accounts')
        const account = await accountCollection.findOne({ where: { email } })
        return !!account
    }

    async loadUserByID(id: number): Promise<AccountUser | null> {
        const accountCollection = SQLHelper.getRepository('Accounts')
        const user = await accountCollection.findOne({ where: { id } })
        if (user) {
            return user as AccountUser
        }
        return null
    }

    async loadUserByCustomField(fieldName: string, fieldValue: any): Promise<AccountUser | null> {
        const accountCollection = SQLHelper.getRepository('Accounts')
        const user = await accountCollection.findOne({ where: { [fieldName]: fieldValue } })
        if (user) {
            return user as AccountUser
        }
        return null
    }
}