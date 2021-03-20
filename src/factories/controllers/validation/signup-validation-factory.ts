import { Validation } from "../../../types"
import { CheckTypeField, CompareFieldValidation, RequiredFieldValidation } from "../../../validators"
import { ValidationComposite } from "../../../validators/validation-composite"



const fieldsAndTypes = [
  { field_name: 'name', types: ['string'] },
  { field_name: 'email', types: ['string'] },
  { field_name: 'password', types: ['string'] },
  { field_name: 'password_confirmation', types: ['string'] },
  { field_name: 'type', types: ['number'] },
  { field_name: 'status', types: ['boolean'] }
]

export const makeSignUpValidation = () => {
  const validations: Validation[] = []

  fieldsAndTypes.forEach(field => {
    validations.push(new RequiredFieldValidation(field.field_name))
    validations.push(new CheckTypeField(field.field_name, field.types))
  })

  validations.push(new CompareFieldValidation('password', 'password_confirmation'))
  return new ValidationComposite(validations)
}
