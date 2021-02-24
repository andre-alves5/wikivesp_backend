import { UserMongoRepository, MongoHelper } from '@/infra/db'

import { Collection } from 'mongodb'
import faker from 'faker'

const makeSut = (): UserMongoRepository => {
  return new UserMongoRepository()
}

let userCollection: Collection

describe('UserMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('loadByEmail()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const addUserParams = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
      await userCollection.insertOne(addUserParams)
      const user = await sut.loadByEmail(addUserParams.email)
      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
      expect(user.name).toBe(addUserParams.name)
      expect(user.password).toBe(addUserParams.password)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const user = await sut.loadByEmail(faker.internet.email())
      expect(user).toBeFalsy()
    })
  })
})
