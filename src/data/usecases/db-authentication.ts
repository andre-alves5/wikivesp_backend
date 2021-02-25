import { Encrypter, HashComparer, LoadUserByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols'
import { Authentication } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) { }

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const user = await this.loadUserByEmailRepository.loadByEmail(authenticationParams.email)
    if (user) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, user.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(user.id)
        await this.updateAccessTokenRepository.updateAccessToken(user.id, accessToken)
        return {
          accessToken,
          name: user.name
        }
      }
    }
    return null
  }
}
