import { CheckAccountByEmailRepository, LoadUserByEmailRepository } from '@/data/protocols'
import { MongoHelper } from './mongo-helper'

export class UserMongoRepository implements LoadUserByEmailRepository, CheckAccountByEmailRepository {
  async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ email })
    return user && MongoHelper.map(user)
  }

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    const userCollection = await MongoHelper.getCollection('users')
    const account = await userCollection.findOne({
      email
    })
    return account !== null
  }
}
