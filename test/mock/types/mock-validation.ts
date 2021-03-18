import { Validation } from "../../types"

export class ValidationSpy implements Validation {
    error!: Error
    input: any
  
    validate (input: any): Error | undefined {
      this.input = input
      return this.error
    }
  }