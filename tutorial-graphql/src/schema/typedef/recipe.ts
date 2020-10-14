/** @format */

const { gql } = require('apollo-server-express')
export const recipeTypeDef = gql`
  type Recipe {
    id: String!
    name: String!
    description: String!
    ingredients: String!
    category: Category!
  }

  extend type Query {
    getRecipes: [Recipe!]
    getOneRecipe(id: Int): Recipe
  }

  extend type Mutation {
    createRecipe(input: inputCreateRecipe): Recipe
    deleteRecipe(id: Int): Boolean!
    updateRecipe(id: Int, input: inputCreateRecipe): Recipe
  }
  input inputCreateRecipe {
    name: String!
    description: String!
    ingredients: String!
    category: Int
  }
`
