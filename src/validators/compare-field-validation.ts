import { InvalidParamError } from "../types/errors";
import { Validation } from '../types'

export class CompareFieldValidation implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly fieldToCompareName: string
    ) { }

    validate(input: any): Error | undefined {
        if (input[this.fieldName] !== input[this.fieldToCompareName]) {
            return new InvalidParamError(this.fieldToCompareName, "password and password_confirmation doesn't match")
        }
    }
}
