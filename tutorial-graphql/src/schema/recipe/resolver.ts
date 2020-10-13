/** @format */

import { IResolvers } from 'graphql-tools'

const resolvers: IResolvers = {
  Query: {
    helloRecipe: (_: any, { name }) =>
      `Hello  ${name} world from Apollo Server`,
  },
  Mutation: {
    createHello: (_: any, { id }: any) => 2,
  },
}

module.exports.resolvers = resolvers
