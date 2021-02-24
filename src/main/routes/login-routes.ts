import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoginController } from '../factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}
