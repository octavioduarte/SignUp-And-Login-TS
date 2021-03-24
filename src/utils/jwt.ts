import jwt from 'jsonwebtoken'
import { CheckToken, GenerateToken } from '../types'

export class JwtAdapter implements GenerateToken, CheckToken {
  constructor(private readonly secret: string) { }

  async generate(plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret, { expiresIn: '1h' })
  }

  async checkToken(ciphertext: string): Promise<boolean> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
