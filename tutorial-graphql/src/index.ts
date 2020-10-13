/** @format */
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import { generateNamespace } from '@gql2ts/from-schema'
import * as fs from 'fs'

import { ApolloServer } from 'apollo-server-express'
import schema from './schema'

const myNamespace = generateNamespace('MyGraphQL', schema)

fs.writeFile('mySchema.d.ts', myNamespace, (error) => {})

const app: express.Application = express()

const server: ApolloServer = new ApolloServer({ schema, playground: true })

server.applyMiddleware({ app, path: '/graphql' })

createConnection()
  .then(() => {
    app.listen('3000', () => {
      console.log('Server running')
    })
  })
  .catch((e) => console.log(e))