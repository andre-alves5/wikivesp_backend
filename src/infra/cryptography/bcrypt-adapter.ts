import bcrypt from 'bcrypt'

export class BcryptAdapter {
  async compare (plainText: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plainText, digest)
  }
}
