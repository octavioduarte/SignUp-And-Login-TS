import {
  CheckByEmail,
  LoadUserByID,
  CodeErrorsSignUp as code_errors_signup,
  TypesAccountID as types_account_id,
  CreateAccount,
  Hasher,
  SignUpControllerRequestType,
  ResultCreateUser,
  SaveUserDB
} from "../../types"

export class DbCreateAccount implements CreateAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckByEmail,
    private readonly loadUser: LoadUserByID,
    private readonly hasher: Hasher,
    private readonly createAccountRepository: SaveUserDB
  ) { }

  async create(accountData: SignUpControllerRequestType, userID: number): Promise<ResultCreateUser> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)

    if (exists) {
      return { result: code_errors_signup.email_already_exists }
    }

    const userResponsibleForRegistration = await this.loadUser.loadUserByID(Number(userID))

    if (!userResponsibleForRegistration) {
      return { result: code_errors_signup.user_responsible_for_registration_not_found }
    }

    if (userResponsibleForRegistration.type !== types_account_id.root &&
      userResponsibleForRegistration.type !== types_account_id.admin
    ) {
      return { result: code_errors_signup.no_permission }
    }

    const { id } = userResponsibleForRegistration

    const passwordHashed = await this.hasher.hash(accountData.password)
    const account = await this.createAccountRepository.saveUserDB({ ...accountData, created_by: id, password: passwordHashed })

    const { password, ...user_data } = account

    return { user_data }
  }
}
