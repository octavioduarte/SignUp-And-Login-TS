export type HttpResponse = {
  body: any
  statusCode: number
}

export interface Validation {
  validate: (input: any) =>  Error | undefined
}
