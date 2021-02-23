import { Router } from 'express'
import LoginController from '../../app/controllers/LoginController'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/login', adaptRoute(new LoginController()))
}