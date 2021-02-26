import { AddAccountRepository, CheckAccountByEmailRepository, LoadUserByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols'
import { MongoHelper } from './mongo-helper'

export class UserMongoRepository implements AddAccountRepository, LoadUserByEmailRepository, CheckAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.insertOne(data)
    return result.ops[0] !== null
  }

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    const userCollection = await MongoHelper.getCollection('users')
    const account = await userCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return account !== null
  }

  async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return user && MongoHelper.map(user)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}
