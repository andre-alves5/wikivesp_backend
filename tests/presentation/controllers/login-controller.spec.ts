import { LoginController } from '@/app/controllers/LoginController'
import { BcryptAdapter } from '@/infra/cryptography'
import { MongoHelper } from '@/infra/db'
import { Collection } from 'mongodb'
import { unauthorized } from '@/presentation/helpers'

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

  test('Should return 401 if invalid email is provided', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'handle').mockReturnValueOnce(Promise.resolve(unauthorized()))
    const httpResponse = await sut.handle({
      email: 'invalid_email',
      password: 'valid_password'
    })
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 401 if wrong password is provided', async () => {
    const { sut, bcryptAdapter } = makeSut()
    jest.spyOn(bcryptAdapter, 'compare').mockResolvedValueOnce(false)
    const httpResponse = await sut.handle({
      email: 'valid_email',
      password: 'invalid_password'
    })
    expect(httpResponse).toEqual(unauthorized())
  })
})
