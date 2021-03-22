import {
  AddAccountDB,
  CheckByEmail,
  LoadUserByID,
  CodeErrors as code_errors,
  CreateAccount,
  Hasher,
  SignUpControllerRequestType,
  SignUpControllerResponseType,
  TypesAccountID as types_account_id
} from "../../types"

export class DbCreateAccount implements CreateAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckByEmail,
    private readonly loadUser: LoadUserByID,
    private readonly hasher: Hasher,
    private readonly createAccountRepository: AddAccountDB
  ) { }

  async create(accountData: SignUpControllerRequestType, userID: number) {
    let isValid: SignUpControllerResponseType = {
      ...accountData,
      result: 0
    }
    const exists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)

    if (exists) {
      return { ...isValid, result: code_errors.email_already_exists }
    }

    const userResponsibleForRegistration = await this.loadUser.loadUserByID(Number(userID))

    if (!userResponsibleForRegistration) {
      return { ...isValid, result: code_errors.user_responsible_for_registration_not_found }
    }

    if (userResponsibleForRegistration.type !== types_account_id.root &&
      userResponsibleForRegistration.type !== types_account_id.admin
    ) {
      return { ...isValid, result: code_errors.no_permission }
    }

    const { id } = userResponsibleForRegistration

    const password = await this.hasher.hash(accountData.password)
    isValid = await this.createAccountRepository.create({ ...accountData, created_by: id , password })

    return isValid
  }
}
