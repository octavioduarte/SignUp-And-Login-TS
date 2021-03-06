import { ServerError, UnauthorizedError } from '../errors'
import { HttpResponse } from './protocols'

export const forbidden = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 403
})


export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})


export const serverError = (error: Error): HttpResponse => ({
  body: new ServerError(error.stack as string),
  statusCode: 500,
})


export const ok = (data: any): HttpResponse => ({
  body: data,
  statusCode: 200
})

export const badRequest = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 400
})