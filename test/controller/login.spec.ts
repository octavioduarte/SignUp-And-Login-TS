import faker from 'faker'
import { LoginSpy } from '../mock/login'
import { LoginController } from '../../src/controller/login'
import {
    LoginControllerRequestType,
    CodeErrorsLogin as code_errors_login,
    unauthorized,
    serverError,
} from '../../src/types'
import { throwError } from '../mock/types'


const mockRequest = (): LoginControllerRequestType => ({
    email: faker.internet.email(),
    password: faker.random.word()
})

type SutTypes = {
    loginSpy: LoginSpy
    sut: LoginController
}


const makeSut = (): SutTypes => {
    const loginSpy = new LoginSpy()
    const sut = new LoginController(loginSpy)

    return {
        loginSpy,
        sut
    }
}


describe('Login Controller', () => {
    test('Should call Login with correct values', async () => {
        const { sut, loginSpy } = makeSut()
        const bodyRequest = mockRequest()
        await sut.handle(bodyRequest)
        expect(loginSpy.params).toEqual({
            email: bodyRequest.email,
            password: bodyRequest.password
        })
    })

    test('Should return 401 if invalid credentials are provided', async () => {
        const { sut, loginSpy } = makeSut()
        loginSpy.result = code_errors_login.invalid_credentials
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(unauthorized())
    })

    test('Should return 500 if Login throws', async () => {
        const { sut, loginSpy } = makeSut()
        jest.spyOn(loginSpy, 'makeLogin').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 if valid credentials are provided', async () => {
        const { sut, loginSpy } = makeSut()
        const bodyRequest = mockRequest()
        const httpResponse = await sut.handle(bodyRequest)
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body.email).toBe(loginSpy.user.email)
    })
})