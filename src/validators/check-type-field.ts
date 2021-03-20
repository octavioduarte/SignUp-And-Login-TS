import { Validation } from "../types";
import { InvalidTypeError } from "../types/errors/invalid-type-error";

export class CheckTypeField implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly typesField: string[]
    ) { }

    validate(input: any): Error | undefined {
        if (!this.typesField.includes(typeof input[this.fieldName])){
            return new InvalidTypeError(this.fieldName, this.typesField)
        }
    }
}