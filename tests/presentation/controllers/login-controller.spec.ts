import { LoginController } from '@/app/controllers/LoginController'
import { BcryptAdapter } from '@/infra/cryptography'
import { MongoHelper } from '@/infra/db'
import { Collection } from 'mongodb'

let userCollection: Collection

const mockRequest = (): LoginController.Request => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

type SutTypes = {
  sut: LoginController
  bcryptAdapter: BcryptAdapter
}

const makeSut = (): SutTypes => {
  const bcryptAdapter = new BcryptAdapter()
  const sut = new LoginController(bcryptAdapter)
  return {
    sut,
    bcryptAdapter
  }
}

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
    const { sut } = makeSut()
    const handleSpy = jest.spyOn(sut, 'handle')
    await sut.handle(mockRequest())
    expect(handleSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })
})
