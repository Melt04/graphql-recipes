/** @format */

import { makeExecutableSchema } from 'apollo-server-express'
import fs from 'fs'
import { GraphQLSchema } from 'graphql'
import path from 'path'

export default function formatSchema(dirPath: string) {
  const schemas: GraphQLSchema[] = []
  const schemaDir: string[] = fs.readdirSync(dirPath)
  schemaDir.forEach((dir) => {
    const schemaParentDir = path.join(dirPath, dir)
    const schemaPath = path.join(schemaParentDir, '/schema.graphql')
    const schemaFile = fs.readFileSync(schemaPath, 'utf8')
    const { resolvers } = require(`${schemaParentDir}/resolver.ts`)
    schemas.push(
      makeExecutableSchema({
        typeDefs: schemaFile,
        resolvers,
      })
    )
  })

  return schemas
}
