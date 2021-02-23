import { BcryptAdapter } from '@/infra/cryptography'
import { Router } from 'express'
import { LoginController } from '../../app/controllers/LoginController'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  const bcryptAdapter = new BcryptAdapter()
  router.post('/login', adaptRoute(new LoginController(bcryptAdapter)))
}