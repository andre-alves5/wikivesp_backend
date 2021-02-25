import { PasswordValidator } from '@/validation/protocols'

export class PasswordValidatorSpy implements PasswordValidator {
  isPasswordValid = true
  password: string

  isStrong (password: string): boolean {
    this.password = password
    return this.isPasswordValid
  }
}
