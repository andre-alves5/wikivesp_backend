import { BcryptAdapter } from '@/infra/cryptography'
import { MongoHelper } from '@/infra/db'
import { success, unauthorized } from '@/presentation/helpers/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor(private readonly bcryptAdapter: BcryptAdapter) { }
  async handle(request: LoginController.Request): Promise<HttpResponse> {
    const userCollection = await MongoHelper.getCollection('users')
    const { email, password } = request

    const account = await userCollection.findOne({ email: email })

    if (!account) {
      return unauthorized()
    }

    if (!(await this.bcryptAdapter.compare(password, account.password))) {
      return unauthorized()
    }

    return success(account)
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
