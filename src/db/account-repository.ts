import {
    AccountUser,
    CheckByEmail,
    CreateAccount,
    SignUpControllerRequestType,
    SignUpControllerResponseType,
    TypesAccountID as types_account_id,
    CheckPermission
} from "../types";
import { SQLHelper } from "./helpers";

export class AccountRepository implements CreateAccount, CheckByEmail, CheckPermission {

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

    async check(tokenResponsibleAccount: string): Promise<boolean> {
        const accountCollection = SQLHelper.getRepository('Accounts')
        const user = await accountCollection.findOne({ where: { id: tokenResponsibleAccount } })
        if (user) {
            const { type_account } = user as AccountUser
            return type_account === types_account_id.root
        }
        return false;
    }
}