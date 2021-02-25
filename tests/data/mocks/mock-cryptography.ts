import { HashComparer, Hasher } from '@/data/protocols'
import faker from 'faker'

export class HashComparerSpy implements HashComparer {
  plaintext: string
  digest: string
  isValid = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return this.isValid
  }
}

export class HasherSpy implements Hasher {
  plainText: string
  digest = faker.random.uuid()

  async hash (plainText: string): Promise<string> {
    this.plainText = plainText
    return this.digest
  }
}
