import { MongoHelper } from '@/infra/db'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { compare } from 'bcrypt'

class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export default class LoginController implements Controller {
  async handle(request: LoginController.Request): Promise<HttpResponse> {
    const userCollection = await MongoHelper.getCollection('users')
    const { email, password } = request

    const account = await userCollection.findOne({ email: email })

    if (!account) {
      return unauthorized()
    }

    if (!(await compare(password, account.password))) {
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
