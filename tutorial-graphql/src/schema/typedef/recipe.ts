/** @format */

const { gql } = require('apollo-server-express')
export const recipeTypeDef = gql`
  type Recipe {
    id: String!
    name: String!
    description: String!
    ingredients: [String!]!
    category: Category
    User: User
  }

  extend type Query {
    getRecipes: [Recipe!]
    getOneRecipe(field: AllowedFields, value: String!): Recipe
    getMyRecipes: [Recipe!]
  }

  enum AllowedFields {
    name
    id
    category
    ingredients
  }

  extend type Mutation {
    createRecipe(input: inputCreateRecipe): Recipe
    deleteRecipe(id: Int): Boolean!
    updateRecipe(id: Int, input: inputUpdateRecipe): Boolean
  }
  input inputUpdateRecipe {
    name: String
    description: String
    ingredients: [String]
    category: Int
  }
  input inputCreateRecipe {
    name: String!
    description: String!
    ingredients: [String]!
    category: Int
    user: Int
  }
`
