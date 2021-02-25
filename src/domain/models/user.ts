export type UserModel = {
  name: string
  email: string
  password: string
  passwordRecovery?: string
  campus?: string
  class?: string
  course?: string
  profilePictureOriginalName?: string
  profilePictureHashedName?: string
}
