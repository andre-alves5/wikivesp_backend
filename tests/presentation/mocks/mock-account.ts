import { AddAccount, Authentication, UpdateAccount } from '@/domain/usecases'
import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = true

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}

export class UpdateAccountSpy implements UpdateAccount {
  params: UpdateAccount.Params
  result = true

  async update (params: UpdateAccount.Params): Promise<UpdateAccount.Result> {
    this.params = params
    return this.result
  }
}
