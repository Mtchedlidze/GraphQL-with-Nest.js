import { pbkdf2, randomBytes } from 'crypto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HashService {
  passowrd: string
  salt: string

  async hashPassword(password: string, salt?: string): Promise<string> {
    salt = salt || randomBytes(16).toString('hex')
    return new Promise((resolve, reject) => {
      const iterations = 50000
      const keylen = 16
      const digest = 'sha512'

      pbkdf2(password, salt, iterations, keylen, digest, (err, key) => {
        if (err) {
          reject({
            error: err,
          })
        }
        const password = [key.toString('hex'), salt].join('.')

        resolve(password)
      })
    })
  }
}
