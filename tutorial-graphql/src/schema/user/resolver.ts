/** @format */

import { IResolvers } from 'graphql-tools'
import { User } from '../../database/entity/User'
import { matchPassword } from '../../utils/database/hashPassword'
import { AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'

const resolvers: IResolvers = {
  Query: {
    getAllUsers: async (_: any, __: any, context: any): Promise<User[]> => {
      let users: User[] = []
      users = await User.find()
      return users
    },
  },
  Mutation: {
    login: async (_: any, { input }: MyGraphQL.ILoginOnMutationArguments) => {
      const { password, email } = <MyGraphQL.IInputLoginUser>input
      const [user] = await User.find({ where: { email } })
      if (!user) {
        throw new AuthenticationError('Invalid Credentials')
      }
      let match = await matchPassword(password, user.pasword)

      if (match) {
        let token = jwt.sign(
          { email: user.email },
          <string>process.env.PRIVATE_KEY
        )
        return { token }
      } else {
        throw new AuthenticationError('Invalid Credentials')
      }
    },
    signup: async (
      _: any,
      { input }: MyGraphQL.ISignupOnMutationArguments
    ): Promise<User> => {
      const user = new User()
      user.email = input.email
      user.name = input.name
      user.pasword = input.password
      try {
        await user.save()
      } catch (e) {
        console.log(e)
        throw e
      }
      return user
    },
  },
}

module.exports.resolvers = resolvers
