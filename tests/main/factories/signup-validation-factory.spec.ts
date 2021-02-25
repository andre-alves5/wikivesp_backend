import { makeSignUpValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation, PasswordValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { ValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new PasswordValidation('password', new ValidatorAdapter()))
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new ValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
