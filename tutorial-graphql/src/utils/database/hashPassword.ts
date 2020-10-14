/** @format */

import bcrypt from 'bcrypt'

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, <string | number>process.env.SALT_ROUNDS)
}

export function matchPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
