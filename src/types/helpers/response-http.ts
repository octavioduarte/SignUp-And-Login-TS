import { HttpResponse } from './protocols'

export const forbidden = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 403
})
