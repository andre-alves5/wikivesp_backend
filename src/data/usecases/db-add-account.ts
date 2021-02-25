import { Hasher } from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher) { }

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    await this.hasher.hash(accountData.password)
    return null
  }
}
