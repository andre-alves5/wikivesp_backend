import { AddAccountRepository, LoadUserByEmailRepository } from '@/data/protocols'
import faker from 'faker'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result = true

  async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepository {
  email: string
  result = {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    password: faker.internet.password()
  }

  async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}
