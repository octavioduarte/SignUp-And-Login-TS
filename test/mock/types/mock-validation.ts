import { Validation } from "../../types"

export class ValidationSpy implements Validation {
    error: Error | null = null
    input: any
  
    validate (input: any): Error | null {
      this.input = input
      return this.error
    }
  }