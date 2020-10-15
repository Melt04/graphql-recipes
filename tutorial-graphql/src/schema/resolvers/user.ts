/** @format */

import { IResolvers } from 'graphql-tools'
import { User } from '../../database/entity/User'
import { matchPassword } from '../../utils/database/hashPassword'
import { AuthenticationError } from 'apollo-server-express'
import { Context } from '../../utils/context/context'
import jwt from 'jsonwebtoken'
const { combineResolvers } = require('graphql-resolvers')
import isAuthenticated from '../../middleware'

export const userResolver: IResolvers = {
  Query: {
    getAllUsers: combineResolvers(
      isAuthenticated,
      async (_: any, __: any, context: Context): Promise<User[]> => {
        let users: User[] = []

        try {
          users = await User.find()

          return users
        } catch (e) {
          console.log(e)
          throw e
        }
      }
    ),
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
    ): Promise<boolean> => {
      const { email, password, name } = <MyGraphQL.IInputUserCreate>input
      const [userExist]: User[] = await User.find({ where: { email } })
      if (userExist) {
        throw new Error('Email alredy in use')
      }

      const user = new User()
      user.email = email
      user.name = name
      user.pasword = password
      try {
        await user.save()
        return true
      } catch (e) {
        console.log(e)
        throw e
      }
    },
  },
}
