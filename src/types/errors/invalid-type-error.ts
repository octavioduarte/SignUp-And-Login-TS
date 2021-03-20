export class InvalidTypeError extends Error {
    constructor(paramName: string, correctTypes: string[]) {
        super(`Param '${paramName}' is incorrectly typed, the types allowed for this parameter are : ${correctTypes}`)
        this.name = 'InvalidTypeError'
    }
}
