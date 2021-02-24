import { LoadUserByEmailRepository } from "@/data/protocols"

export class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepository {
  email: string
  result = {
    id: 'any_id',
    name: 'any_name',
    password: 'any_password'
  }

  async loadByEmail(email: string): Promise<LoadUserByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}