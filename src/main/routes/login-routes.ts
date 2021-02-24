import { Router } from 'express'
import { LoginController } from '@/presentation/controllers'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/login', adaptRoute(LoginController))
}
