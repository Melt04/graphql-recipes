/** @format */

const { gql } = require('apollo-server-express')
export const categoryTypeDef = gql`
  type Category {
    id: Int!
    name: String!
  }

  extend type Query {
    getCategories: [Category!]
    getOneCategory(id: Int): Category
  }

  extend type Mutation {
    createCategory(input: inputCreateCategory): Category!
    updateCategory(id: Int, input: inputCreateCategory): Boolean!
    deleteCategory(id: Int): Boolean!
  }

  input inputCreateCategory {
    name: String!
  }
`
