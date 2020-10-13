/** @format */

import path from 'path'
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'
import formatSchema from './utils/formatSchema'
const schemaUserFile = path.join(__dirname, './schema/user/schema.graphql')
const schemaCategoryFile = path.join(
  __dirname,
  './schema/category/schema.graphql'
)
const schemas = formatSchema(path.join(__dirname, '/schema'))
const schema: GraphQLSchema = mergeSchemas({ schemas })

export default schema
