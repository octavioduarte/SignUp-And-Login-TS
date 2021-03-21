import { StringsValidationType, Validation } from "../../../types"
import { EmailValidatorAdapter } from "../../../types/utils/email-validator"
import { CheckTypeField, CompareFieldValidation, RequiredFieldValidation } from "../../../validators"
import { EmailValidation } from "../../../validators/email-validation"
import { StringsValidation } from "../../../validators/generic-strings-validation"
import { ValidationComposite } from "../../../validators/validation-composite"


type wordsValidationType = {
  fieldName: string
  propsValidation: StringsValidationType
}[]

const fieldsAndTypes = [
  { field_name: 'name', types: ['string'] },
  { field_name: 'email', types: ['string'] },
  { field_name: 'password', types: ['string'] },
  { field_name: 'password_confirmation', types: ['string'] },
  { field_name: 'type', types: ['number'] },
  { field_name: 'status', types: ['boolean'] }
]

const wordsValidation: wordsValidationType = [
  {
    fieldName: 'name',
    propsValidation: [
      {
        customMessage: 'just type letters for the name field',
        methodName: "checkJustLetters",
      },
      {
        customMessage: 'type name and lastname',
        methodName: 'checkNumberMinOfWords',
        min: 2
      }
    ]
  },
  {
    fieldName: 'password',
    propsValidation: [
      {
        customMessage: 'password must be at least 6 characters',
        methodName: "checkLength",
        min: 6
      }
    ]
  }
]


export const makeSignUpValidation = () => {
  const validations: Validation[] = []

  fieldsAndTypes.forEach(field => {
    validations.push(new RequiredFieldValidation(field.field_name))
    validations.push(new CheckTypeField(field.field_name, field.types))
  })



  wordsValidation.forEach(field => {
    validations.push(new StringsValidation(field.fieldName, field.propsValidation))
  })


  validations.push(new CompareFieldValidation('password', 'password_confirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
