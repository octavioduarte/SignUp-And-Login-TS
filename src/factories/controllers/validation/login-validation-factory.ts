import { Validation } from "../../../types"
import { CheckTypeField, RequiredFieldValidation } from "../../../validators"
import { ValidationComposite } from "../../../validators/validation-composite"


const fieldsAndTypes = [
    { field_name: 'email', types: ['string'] },
    { field_name: 'password', types: ['string'] }
]


export const makeLoginValidation = () => {
    const validations: Validation[] = []

    fieldsAndTypes.forEach(field => {
        validations.push(new RequiredFieldValidation(field.field_name))
        validations.push(new CheckTypeField(field.field_name, field.types))
    })

    return new ValidationComposite(validations)
}