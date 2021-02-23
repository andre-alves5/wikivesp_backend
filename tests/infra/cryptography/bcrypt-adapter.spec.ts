import { BcryptAdapter } from "@/infra/cryptography"
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async compare(): Promise<boolean> {
    return true
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter()
}

describe('Bcrypt Adapter', () => {
  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_plainText', 'any_digest')
    expect(compareSpy).toHaveBeenCalledWith('any_plainText', 'any_digest')
  })

  test('Should return false when compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false)
    const isValid = await sut.compare('any_plainText', 'any_digest')
    expect(isValid).toBe(false)
  })

  test('Should return true when compare succeeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_plainText', 'any_digest')
    expect(isValid).toBe(true)
  })
})
