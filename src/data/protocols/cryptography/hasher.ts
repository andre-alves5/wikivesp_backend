export interface Hasher {
  hash: (plaitext: string) => Promise<string>
}
