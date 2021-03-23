
import { Router } from 'express'
import { adaptRoute } from '../adapters/router-adapter'
import { makeLoginController } from '../../factories/controllers/login-controller-factory'


export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}
