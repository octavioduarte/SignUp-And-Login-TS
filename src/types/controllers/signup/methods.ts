import { SignUpControllerRequestType, SignUpControllerResponseType } from './objects'

export interface CreateAccount {
    create: (account: SignUpControllerRequestType) => Promise<SignUpControllerResponseType>
}