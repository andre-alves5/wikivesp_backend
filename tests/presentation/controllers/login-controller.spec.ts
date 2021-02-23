import { LoginController } from '@/app/controllers/LoginController'
import { BcryptAdapter } from '@/infra/cryptography'
import { MongoHelper } from '@/infra/db'
import { Collection } from 'mongodb'

let userCollection: Collection

describe('Login Controller', () => {
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

  test('Should call controller with correct values', async () => {
    const bcryptAdapter = new BcryptAdapter()
    const sut = new LoginController(bcryptAdapter)
    const handleSpy = jest.spyOn(sut, 'handle')
    const request = {
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await sut.handle(request)
    expect(handleSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })
})
