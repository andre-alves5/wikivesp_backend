import { DbAddAccount } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import { UserMongoRepository } from '@/infra/db'
import { BcryptAdapter } from '@/infra/cryptography'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userMongoRepository = new UserMongoRepository()
  return new DbAddAccount(bcryptAdapter, userMongoRepository, userMongoRepository)
}
