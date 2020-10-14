/** @format */

import bcrypt, { genSalt } from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
  let salt = parseInt(<string>process.env.SALT_ROUND)

  return bcrypt.hash(password, <number | string>salt)
}

export function matchPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
