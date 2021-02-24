import { LoadUserByEmailRepository } from '@/data/protocols'
import faker from 'faker'

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
