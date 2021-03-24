import {
    CheckByEmail,
    SaveUserDB,
    LoadUserByID,
    LoadUserByCustomField,
    AccountUserDB,
    SignUpSaveDB
} from "../types";
import { SQLHelper } from "./helpers";

export class AccountRepository implements SaveUserDB, CheckByEmail, LoadUserByID, LoadUserByCustomField {

    async saveUserDB(account: SignUpSaveDB): Promise<AccountUserDB> {
        const accountRepository = SQLHelper.getRepository('Accounts')
        await accountRepository.save(account)
        return await this.loadUserByCustomField('email', account.email) as AccountUserDB
    }

    async checkByEmail(email: string): Promise<boolean> {
        const accountCollection = SQLHelper.getRepository('Accounts')
        const account = await accountCollection.findOne({ where: { email } })
        return !!account
    }

    async loadUserByID(id: number): Promise<AccountUserDB | null> {
        const accountCollection = SQLHelper.getRepository('Accounts')
        const user = await accountCollection.findOne({ where: { id } })
        if (user) {
            return user as AccountUserDB
        }
        return null
    }

    async loadUserByCustomField(fieldName: string, fieldValue: any): Promise<AccountUserDB | null> {
        const accountCollection = SQLHelper.getRepository('Accounts')
        const user = await accountCollection.findOne({ where: { [fieldName]: fieldValue } })
        if (user) {
            return user as AccountUserDB
        }
        return null
    }
}