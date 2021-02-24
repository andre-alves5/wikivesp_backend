import { Authentication } from "@/domain/usecases";
import { serverError, success, unauthorized } from "../helpers";
import { Controller, HttpResponse } from "../protocols";

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication) { }

  async handle(request: LoginController.Request): Promise<HttpResponse> {
    try {
      const authenticationModel = await this.authentication.auth(request)
      if (!authenticationModel) {
        return unauthorized()
      }
      return success(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}