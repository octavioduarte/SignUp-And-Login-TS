import {
    GenericMethodsValidationString,
    InvalidParamError,
    PropsValidationTypes,
    StringsValidationType,
    Validation
} from "../types"

export class StringsValidation implements Validation, GenericMethodsValidationString {
    constructor(
        private readonly fieldName: string,
        private readonly fieldValidations: StringsValidationType
    ) { }

    validate(input: any): Error | undefined {
        for (let i = 0; i < this.fieldValidations.length; i++) {
            const fieldValidation = this.fieldValidations[i]
            const result = this[fieldValidation.methodName](
                {
                    customMessage: fieldValidation.customMessage,
                    wordString: input[this.fieldName],
                    min: fieldValidation.min,
                    max: fieldValidation.max
                }
            )
            if (result) {
                return new InvalidParamError(input[this.fieldName], result.toString())
            }
        }
    }

    checkLength(propsValidation: PropsValidationTypes): string | undefined {
        if (propsValidation.wordString.length < Number(propsValidation.min) ||
            propsValidation.wordString.length > Number(propsValidation.max)
        ) {
            return propsValidation.customMessage
        }
    }


    checkNumberMinOfWords(propsValidation: PropsValidationTypes): string | undefined {
        const quantityWords: number = propsValidation.wordString.split(' ').length
        if (quantityWords < Number(propsValidation.min)) {
            return propsValidation.customMessage
        }
    }

    checkJustLetters(propsValidation: PropsValidationTypes): string | undefined {
        const regexJustLetters: RegExp = /^[a-záàâãéèêíïóôõöúçñ ]+$/i
        if (!regexJustLetters.test(propsValidation.wordString)) {
            return propsValidation.customMessage
        }
    }
}