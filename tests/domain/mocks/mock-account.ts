import { Authentication } from '../usecases'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: 'valid_email@mail.com',
  password: 'valid_password'
})
