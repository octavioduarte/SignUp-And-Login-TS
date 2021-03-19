import { Validation } from "../../../types"
import { RequiredFieldValidation } from "../../../validators"
import { ValidationComposite } from "../../../validators/validation-composite"

export const makeSignUpValidation = () => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
