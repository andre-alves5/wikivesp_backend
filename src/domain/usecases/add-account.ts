import { UserModel } from '../models/user'

export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Params = UserModel

  export type Result = boolean
}
