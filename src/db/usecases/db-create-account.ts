import {
  AccountUser,
  AddAccountDB,
  CheckByEmail,
  CheckPermission,
  CreateAccount,
  Hasher,
  SignUpControllerRequestType,
  SignUpControllerResponseType
} from "../../types"

export class DbCreateAccount implements CreateAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckByEmail,
    private readonly checkPermission: CheckPermission,
    private readonly hasher: Hasher,
    private readonly createAccountRepository: AddAccountDB
  ) { }

  async create(accountData: SignUpControllerRequestType, responsibleAccount: AccountUser) {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)
    let isValid: boolean | SignUpControllerResponseType = false

    if (!exists) {
      const userHasPermission = this.checkPermission.check(responsibleAccount.id)

      if (userHasPermission) {
        const password = await this.hasher.hash(accountData.password)
        isValid = await this.createAccountRepository.create({ ...accountData, password })
      }
    }


    return isValid as SignUpControllerResponseType
  }
}
