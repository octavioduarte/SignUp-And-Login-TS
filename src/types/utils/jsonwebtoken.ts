export interface GenerateToken {
    generate: (plaintext: string) => Promise<string>
}


export interface CheckToken {
    checkToken: (ciphertext: string) => Promise<boolean>
}
