import { Controller, HttpResponse } from '@/presentation/protocols'
import { UpdateAccount } from '@/domain/usecases'

export class UpdateAccountController implements Controller {
  constructor (private readonly updateAccount: UpdateAccount) { }

  async handle (data: UpdateAccountController.Request): Promise<HttpResponse> {
    await this.updateAccount.update(data)
    return null
  }
}

export namespace UpdateAccountController {
  export type Request = {
    id: string
    name: string
    email: string
    password: string
  }
}
