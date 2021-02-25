import { HashComparer, Hasher } from '@/data/protocols'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashComparer, Hasher {
  constructor (private readonly salt: number) { }

  async compare (plainText: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plainText, digest)
  }

  async hash (plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.salt)
  }
}
