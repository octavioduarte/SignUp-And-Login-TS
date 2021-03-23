import { MissingParamError, Validation } from "../types";


export class RequiredFieldValidation implements Validation {
    constructor(private readonly fieldName: string) { }

    validate(input: any): Error | undefined {
        if (!input[this.fieldName] && typeof input[this.fieldName] !== 'boolean') {
            return new MissingParamError(this.fieldName)
        }
    }
}
