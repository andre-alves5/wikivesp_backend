import { PasswordValidator } from '@/validation/protocols'
import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class PasswordValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly passwordValidator: PasswordValidator
  ) { }

  validate (input: any): Error {
    const isValid = this.passwordValidator.isStrong(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
