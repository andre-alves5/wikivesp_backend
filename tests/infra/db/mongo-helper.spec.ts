import { MongoHelper as sut } from '@/infra/db'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let userCollection = await sut.getCollection('users')
    expect(userCollection).toBeTruthy()
    await sut.disconnect()
    userCollection = await sut.getCollection('users')
    expect(userCollection).toBeTruthy()
  })
})
