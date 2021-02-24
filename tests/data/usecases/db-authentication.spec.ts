import { DbAuthentication } from "@/data/usecases/db-authentication"
import { mockAuthenticationParams } from "@/tests/domain/mocks/mock-account"
import { HashComparerSpy } from "../mocks/mock-cryptography"
import { LoadUserByEmailRepositorySpy } from "../mocks/mock-db-account"

describe('DbAuthentication UseCase', () => {

  type SutTypes = {
    sut: DbAuthentication
    loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy
    hashComparerSpy: HashComparerSpy
  }

  const makeSut = (): SutTypes => {
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
    const hashComparerSpy = new HashComparerSpy()
    const sut = new DbAuthentication(loadUserByEmailRepositorySpy, hashComparerSpy)
    return {
      sut,
      loadUserByEmailRepositorySpy,
      hashComparerSpy
    }
  }

  test('Should call LoadUserByEmailRespository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadUserByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })
})
