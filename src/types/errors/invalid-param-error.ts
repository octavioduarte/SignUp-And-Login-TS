export class InvalidParamError extends Error {
    constructor(paramName: string, customMessage?: string) {
        super(customMessage ? customMessage : `Invalid param: ${paramName}`)
        this.name = 'InvalidParamError'
    }
}
