import faker from 'faker'
import { LoginSpy } from '../mock/login'
import { LoginController } from '../../src/controller/login'
import {
    LoginControllerRequestType,
    CodeErrorsLogin as code_errors_login,
    unauthorized,
    serverError,
    MissingParamError,
    badRequest,
} from '../../src/types'
import { throwError, ValidationSpy } from '../mock/types'


const mockRequest = (): LoginControllerRequestType => ({
    email: faker.internet.email(),
    password: faker.random.word()
})

type SutTypes = {
    loginSpy: LoginSpy
    validationSpy: ValidationSpy
    sut: LoginController
}


const makeSut = (): SutTypes => {
    const loginSpy = new LoginSpy()
    const validationSpy = new ValidationSpy()
    const sut = new LoginController(loginSpy, validationSpy)

    return {
        loginSpy,
        sut,
        validationSpy
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


    test('Should call Validation with correct value', async () => {
        const { sut, validationSpy } = makeSut()
        const bodyRequest = mockRequest()
        await sut.handle(bodyRequest)
        expect(validationSpy.input).toEqual(bodyRequest)
    })

    test('Should return 400 if Validation returns an error', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new MissingParamError(faker.random.word())
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(badRequest(validationSpy.error))
    })

})