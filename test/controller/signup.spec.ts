import faker from 'faker'
import { SignUpController } from '../../src/controller/signup'
import { SignUpControllerRequestType, CodeErrors as code_errors } from '../../src/types/controllers/signup'
import { CreateAccountSpy } from '../mock/signup'
import { forbidden } from '../../src/types/helpers/response-http'
import { NoPermissionToRegisterNewUser } from '../../src/types/errors/no-permission-to-register-new-user'

const mockRequest = (): SignUpControllerRequestType => ({
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password: faker.random.word(),
    status_account: true,
    type_account: faker.random.word()
})

type SutTypes = {
    createAccountSpy: CreateAccountSpy
    sut: SignUpController
}

const makeSut = (): SutTypes => {
    const createAccountSpy = new CreateAccountSpy()
    const sut = new SignUpController(createAccountSpy)

    return {
        createAccountSpy,
        sut
    }
}

describe('SignUp Controller', () => {
    test('Should call CreateAccount with correct values', async () => {
        const { sut, createAccountSpy } = makeSut()
        const bodyRequest = mockRequest()
        await sut.handle(bodyRequest)
        expect(createAccountSpy.params).toEqual({
            email: bodyRequest.email,
            name: bodyRequest.name,
            password: bodyRequest.password,
            status_account: bodyRequest.status_account,
            type_account: bodyRequest.type_account
        })
    })

    test('Should return 403 if CreateAccount returns no permission code', async () => {
        const { sut, createAccountSpy } = makeSut()
        createAccountSpy.result = code_errors.no_permission
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(forbidden(new NoPermissionToRegisterNewUser()))
      })
}) 