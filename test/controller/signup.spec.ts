import faker from 'faker'
import { SignUpController } from '../../src/controller/signup'
import { CreateAccountSpy } from '../mock/signup'
import {
    forbidden,
    NoPermissionToRegisterNewUser,
    SignUpControllerRequestType,
    CodeErrorsSignUp as code_errors,
    serverError,
    ServerError,
    ok,
    MissingParamError,
    badRequest
} from '../../src/types'
import { throwError, ValidationSpy } from '../mock/types'


const mockRequest = (): SignUpControllerRequestType => {
    const secret_pass: string = faker.random.word()
    return {
        created_by: faker.random.number(),
        email: faker.internet.email(),
        name: faker.name.firstName(),
        password: secret_pass,
        password_confirmation: secret_pass,
        status: true,
        type: faker.random.number()
    }
}

type SutTypes = {
    createAccountSpy: CreateAccountSpy
    sut: SignUpController
    validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
    const createAccountSpy = new CreateAccountSpy()
    const validationSpy = new ValidationSpy()
    const sut = new SignUpController(createAccountSpy, validationSpy)

    return {
        createAccountSpy,
        sut,
        validationSpy
    }
}

describe('SignUp Controller', () => {
    test('Should call CreateAccount with correct values', async () => {
        const { sut, createAccountSpy } = makeSut()
        const bodyRequest = mockRequest()
        await sut.handle(bodyRequest)
        expect(createAccountSpy.params).toEqual({
            created_by: bodyRequest.created_by,
            email: bodyRequest.email,
            name: bodyRequest.name,
            password: bodyRequest.password,
            password_confirmation: bodyRequest.password_confirmation,
            status: bodyRequest.status,
            type: bodyRequest.type
        })
    })

    test('Should return 403 if CreateAccount returns no permission code', async () => {
        const { sut, createAccountSpy } = makeSut()
        createAccountSpy.result = code_errors.no_permission
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(forbidden(new NoPermissionToRegisterNewUser()))
    })

    test('Should return 500 if CreateAccount throws', async () => {
        const { sut, createAccountSpy } = makeSut()
        jest.spyOn(createAccountSpy, 'create').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(serverError(new ServerError(null as any)))
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()
        const bodyRequest = mockRequest()
        const httpResponse = await sut.handle(bodyRequest)
        expect(httpResponse.statusCode).toEqual(200)
    })

    test('Should call Validation with correct value', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(validationSpy.input).toEqual(request)
    })

    test('Should return 400 if Validation returns an error', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new MissingParamError(faker.random.word())
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(badRequest(validationSpy.error))
    })
}) 