import faker from 'faker'
import { LoginSpy } from '../mock/login'
import { LoginController } from '../../src/controller/login'
import { LoginControllerRequestType } from '../types'


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
})