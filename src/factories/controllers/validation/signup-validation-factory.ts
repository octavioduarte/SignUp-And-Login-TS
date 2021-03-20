import { Validation } from "../../../types"
import { CompareFieldValidation, RequiredFieldValidation } from "../../../validators"
import { ValidationComposite } from "../../../validators/validation-composite"

export const makeSignUpValidation = () => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'password_confirmation', 'type', 'status']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldValidation('password', 'password_confirmation'))
  return new ValidationComposite(validations)
}
