/** @format */

import { IResolvers } from 'graphql-tools'

const resolvers: IResolvers = {
  Query: {
    helloWorld: (_: any, { name }: MyGraphQL.IHelloWorldOnQueryArguments) =>
      `Hello  ${name} world from Apollo Server`,
  },
  Mutation: {
    createUser: (_: any, inputOptions): any => 'hola',
  },
}

module.exports.resolvers = resolvers
