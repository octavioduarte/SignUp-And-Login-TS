import { ServerError } from '../errors'
import { HttpResponse } from './protocols'

export const forbidden = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 403
})


export const serverError = (error: Error): HttpResponse => ({
  body: new ServerError(error.stack as string),
  statusCode: 500,
})
