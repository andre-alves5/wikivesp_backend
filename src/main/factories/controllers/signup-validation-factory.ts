import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation, PasswordValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { ValidatorAdapter } from '@/infra/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new PasswordValidation('password', new ValidatorAdapter()))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new ValidatorAdapter()))
  return new ValidationComposite(validations)
}
