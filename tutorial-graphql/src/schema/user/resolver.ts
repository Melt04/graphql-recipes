/** @format */

import { IResolvers } from 'graphql-tools'
import { User } from '../../database/entity/User'
import { getRepository } from 'typeorm'
import { stringify } from 'querystring'

const resolvers: IResolvers = {
  Query: {
    getAllUsers: async (): Promise<User[]> => {
      let users: User[] = []
      users = await User.find()
      return users
    },
  },
  Mutation: {
    signup: async (
      _: any,
      { input }: MyGraphQL.ISignupOnMutationArguments
    ): Promise<User> => {
      const user = new User()
      user.email = input.email
      user.name = input.name
      user.pasword = input.password
      await user.save()
      return user
    },
  },
}

module.exports.resolvers = resolvers
