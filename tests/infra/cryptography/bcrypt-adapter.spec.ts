import { BcryptAdapter } from '@/infra/cryptography'
import { throwError } from '@/tests/domain/mocks/test-helpers'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async compare (): Promise<boolean> {
    return true
  },

  async hash (): Promise<string> {
    return 'hash'
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('compare()', () => {
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

    test('Should throw if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
      const promise = sut.compare('any_plainText', 'any_digest')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('hash()', () => {
    test('Should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_plainText')
      expect(hashSpy).toHaveBeenCalledWith('any_plainText', salt)
    })
  })
})
