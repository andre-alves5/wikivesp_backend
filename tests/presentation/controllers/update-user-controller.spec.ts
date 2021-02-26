import { UpdateAccountController } from '@/presentation/controllers'
import { UpdateAccountSpy } from '@/tests/presentation/mocks'
import { mockUpdateAccountParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: UpdateAccountController
  updateAccountSpy: UpdateAccountSpy
}

const makeSut = (): SutTypes => {
  const updateAccountSpy = new UpdateAccountSpy()
  const sut = new UpdateAccountController(updateAccountSpy)
  return {
    sut,
    updateAccountSpy
  }
}

describe('Update User Controller', () => {
  test('Should call UpdateAccount with correct values', async () => {
    const { sut, updateAccountSpy } = makeSut()
    const request = mockUpdateAccountParams()
    await sut.handle(request)
    expect(updateAccountSpy.params).toEqual({
      id: request.id,
      name: request.name,
      email: request.email,
      password: request.password
    })
  })
})
