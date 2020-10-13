/** @format */

import { IResolvers } from 'graphql-tools'

const resolvers: IResolvers = {
  Query: {
    helloCategory: (_: any, { name }) =>
      `Hello  ${name} world from Apollo Server`,
  },
}

module.exports.resolvers = resolvers
