import { EmailValidator } from '@/validation/protocols'
import { PasswordValidator } from '@/validation/protocols/password-validator'

import validator from 'validator'

export class ValidatorAdapter implements EmailValidator, PasswordValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }

  isStrong (password: string): boolean {
    return validator.isStrongPassword(
      password, {
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
  }
}
