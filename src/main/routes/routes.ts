
import { Router } from 'express'
import { adaptRoute } from '../adapters/router-adapter'
import { makeSignUpController } from '../../factories/controllers/signup-controller-factory'


export default (router: Router): void => {
  router.post('/register-new-user', adaptRoute(makeSignUpController()))
}
