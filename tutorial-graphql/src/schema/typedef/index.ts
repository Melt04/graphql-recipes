/** @format */

const { gql } = require('apollo-server-express')

import { categoryTypeDef } from './category'
import { userTypeDef } from './user'
import { recipeTypeDef } from './recipe'

const typeDefs = gql`
  scalar Date
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }
`

export default [typeDefs, categoryTypeDef, userTypeDef, recipeTypeDef]
