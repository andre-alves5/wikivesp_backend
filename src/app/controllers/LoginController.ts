import { BcryptAdapter } from '@/infra/cryptography'
import { MongoHelper } from '@/infra/db'
import { serverError, success, unauthorized } from '@/presentation/helpers/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor(private readonly bcryptAdapter: BcryptAdapter) { }

  async handle(request: LoginController.Request): Promise<HttpResponse> {
    try {
      const { email, password } = request
      const userCollection = await MongoHelper.getCollection('users')

      const account = await userCollection.findOne({ email })

      if (!account) {
        return unauthorized()
      }

      if (!(await this.bcryptAdapter.compare(password, account.password))) {
        return unauthorized()
      }
      return success(account)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
