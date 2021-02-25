import { AddAccount } from '@/domain/usecases'
import { EmailInUseError } from '../errors'
import { forbidden } from '../helpers'
import { Controller, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount) { }

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    const { name, email, password } = request
    const isValid = await this.addAccount.add({
      name,
      email,
      password
    })
    if (!isValid) {
      return forbidden(new EmailInUseError())
    }
    return null
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
