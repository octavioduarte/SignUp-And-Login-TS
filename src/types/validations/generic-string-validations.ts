import { StringsValidation } from "../../validators/generic-strings-validation"

export type StringsValidationType = {
    customMessage?: string
    max?: number
    methodName: keyof StringsValidation
    min?: number
}[]


export type PropsValidationTypes = {
    customMessage?: string
    max?: number
    min?: number
    wordString: string
}

export interface GenericMethodsValidationString {
    checkLength(propsValidation: PropsValidationTypes): string | undefined
    checkNumberMinOfWords(propsValidation: PropsValidationTypes): string | undefined
    checkJustLetters(propsValidation: PropsValidationTypes): string | undefined
}