import { HttpResponse } from "../protocols"
import { UnauthorizedError } from '@/presentation/errors'

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})