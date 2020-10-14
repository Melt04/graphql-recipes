/** @format */

import jwt from 'jsonwebtoken'
import { User } from '../../database/entity/User'
import { Request } from 'express'
import { Token } from './context'

export async function verifiToken(req: Request): Promise<string | null> {
  const { authorization } = req.headers

  if (authorization) {
    const token = authorization.split('Bearer ')[1]

    const decodedToken = <Token>(
      await jwt.verify(token, <string>process.env.PRIVATE_KEY)
    )
    const { email } = decodedToken
    const [user] = await User.find({ where: { email } })
    if (user) {
      return user.email
    }
    return null
  }
  return null
}
