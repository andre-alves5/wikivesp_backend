import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoginController } from '../factories'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}
