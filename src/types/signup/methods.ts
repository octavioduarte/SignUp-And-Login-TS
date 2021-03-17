import { SignUpControllerRequestType } from './objects'

export interface CreateAccount {
    create: (account: SignUpControllerRequestType) => Promise<SignUpControllerRequestType>
  }