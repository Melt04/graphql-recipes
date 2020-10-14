/** @format */
import { AuthenticationError } from 'apollo-server-express'
import { Context } from '../utils/context/context'
const { skip } = require('graphql-resolvers')
export default function isAuthenticated(_: any, __: any, { email }: Context) {
  if (!email) {
    throw new AuthenticationError('Need to log in to continue')
  } else skip
}
