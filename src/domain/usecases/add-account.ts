import { UserModel } from '@/domain/models'

export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Params = UserModel

  export type Result = boolean
}
