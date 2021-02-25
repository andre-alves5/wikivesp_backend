import { PasswordValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { throwError } from '@/tests/domain/mocks'
import { PasswordValidatorSpy } from '@/tests/validation/mocks'

import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  sut: PasswordValidation
  passwordValidatorSpy: PasswordValidatorSpy
}

const makeSut = (): SutTypes => {
  const passwordValidatorSpy = new PasswordValidatorSpy()
  const sut = new PasswordValidation(field, passwordValidatorSpy)
  return {
    sut,
    passwordValidatorSpy
  }
}

describe('Email Validation', () => {
  test('Should return an error if PasswordValidator returns false', () => {
    const { sut, passwordValidatorSpy } = makeSut()
    passwordValidatorSpy.isPasswordValid = false
    const password = faker.internet.password()
    const error = sut.validate({ [field]: password })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should call PasswordValidator with correct password', () => {
    const { sut, passwordValidatorSpy } = makeSut()
    const password = faker.internet.password()
    sut.validate({ [field]: password })
    expect(passwordValidatorSpy.password).toBe(password)
  })

  test('Should throw if EmailValidator throws', () => {
    const { sut, passwordValidatorSpy } = makeSut()
    jest.spyOn(passwordValidatorSpy, 'isStrong').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
