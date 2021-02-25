import { ValidatorAdapter } from '@/infra/validators'

import validator from 'validator'
const makeSut = (): ValidatorAdapter => {
  return new ValidatorAdapter()
}

describe('ValidatorAdapter', () => {
  describe('isValid()', () => {
    test('Should return false if validator returns false', () => {
      const sut = makeSut()
      jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
      const isValid = sut.isValid('invalid_email@mail.com')
      expect(isValid).toBe(false)
    })

    test('Should return true if validator returns true', () => {
      const sut = makeSut()
      const isValid = sut.isValid('valid_email@mail.com')
      expect(isValid).toBe(true)
    })

    test('Should call validator with correct email', () => {
      const sut = makeSut()
      const isEmailSpy = jest.spyOn(validator, 'isEmail')
      sut.isValid('any_email@mail.com')
      expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
    })
  })

  describe('isStrong()', () => {
    test('Should call validator with correct value', () => {
      const sut = makeSut()
      const isStrongSpy = jest.spyOn(validator, 'isStrongPassword')
      sut.isStrong('weak_password')
      expect(isStrongSpy).toHaveBeenCalledWith('weak_password', {
        minLength: 6,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0,
        pointsForContainingLower: 0,
        pointsForContainingNumber: 0,
        pointsForContainingSymbol: 0,
        pointsForContainingUpper: 0,
        pointsPerRepeat: 0,
        pointsPerUnique: 0,
        returnScore: false
      })
    })

    test('Should return false if validator returns false', () => {
      const sut = makeSut()
      jest.spyOn(validator, 'isStrongPassword').mockReturnValueOnce(false)
      const isStrong = sut.isStrong('weak_password')
      expect(isStrong).toBe(false)
    })

    test('Should return true if validator returns true', () => {
      const sut = makeSut()
      const isStrong = sut.isStrong('123456')
      expect(isStrong).toBe(true)
    })
  })
})
