import { AddAccountRepository, Hasher } from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'
import { CheckAccountByEmailRepository } from '../protocols/db/user/check-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) { }

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    await this.checkAccountByEmailRepository.checkByEmail(accountData.email)
    let isValid = false
    const hashedPassword = await this.hasher.hash(accountData.password)
    isValid = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    return isValid
  }
}
