import {
  AddAccountDB,
  CheckByEmail,
  CheckPermission,
  CodeErrors as code_errors,
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

  async create(accountData: SignUpControllerRequestType, tokenResponsibleAccount: string) {
    let isValid: SignUpControllerResponseType = {
      ...accountData,
      result: 0
    }
    const exists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)

    if (exists) {
      return { ...isValid, result: code_errors.email_already_exists }
    }

    const userHasPermission = await this.checkPermission.check(tokenResponsibleAccount)

    if (!userHasPermission) {
      return { ...isValid, result: code_errors.no_permission }
    }

    console.log("CHEGUEI AQUI !!!!", { exists, userHasPermission })
    const password = await this.hasher.hash(accountData.password)
    isValid = await this.createAccountRepository.create({ ...accountData, password })

    return isValid
  }
}
