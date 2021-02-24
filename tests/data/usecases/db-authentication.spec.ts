import { DbAuthentication } from "@/data/usecases/db-authentication"
import { mockAuthenticationParams } from "@/tests/domain/mocks/mock-account"
import { throwError } from "@/tests/domain/mocks/test-helpers"
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

  test('Should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadUserByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.result = null
    const model = await sut.auth(mockAuthenticationParams())
    expect(model).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadUserByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(hashComparerSpy.plaintext).toBe(authenticationParams.password)
    expect(hashComparerSpy.digest).toBe(loadUserByEmailRepositorySpy.result.password)
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.isValid = false
    const model = await sut.auth(mockAuthenticationParams())
    expect(model).toBeNull()
  })
})
