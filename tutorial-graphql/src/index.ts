/** @format */
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'

import { verifiToken } from './utils/context'
import { Context } from './utils/context/context'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schema/typedef/index'
import resolvers from './schema/resolvers/index'

import * as dotenv from 'dotenv'

dotenv.config()

const app: express.Application = express()

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const contextObj: Context = { email: null }
    const email = await verifiToken(req)
    contextObj.email = email
    return contextObj
  },

  playground: true,
})

server.applyMiddleware({ app, path: '/graphql' })

createConnection()
  .then(() => {
    app.listen('3000', () => {
      console.log('Server running')
    })
  })
  .catch((e) => console.log(e))
