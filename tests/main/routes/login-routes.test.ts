import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'

let userCollection: Collection

describe('POST login', () => {
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

  test('Should return 200 on login', async () => {
    const password = await hash('123456', 12)
    await userCollection.insertOne({
      name: 'User One',
      email: 'userone@users.com',
      password
    })
    await request(app)
      .post('/api/login')
      .send({
        email: 'userone@users.com',
        password: '123456'
      })
      .expect(200)
  })

  test('Should return 401 if user is not found', async () => {
    await request(app)
      .post('/api/login')
      .send({
        email: 'userone@users.com',
        password: '123456'
      })
      .expect(401)
  })
})
