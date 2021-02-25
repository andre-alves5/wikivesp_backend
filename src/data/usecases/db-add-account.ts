import { AddAccountRepository, CheckAccountByEmailRepository, Hasher } from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) { }

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const alreadyExists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)
    let isValid = false
    if (!alreadyExists) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      isValid = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    }
    return isValid
  }
}
