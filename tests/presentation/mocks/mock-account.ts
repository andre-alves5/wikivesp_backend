import { Authentication } from '@/domain/usecases'
import faker from 'faker'

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    name: faker.name.findName()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}
