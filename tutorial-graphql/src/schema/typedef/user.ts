/** @format */

const { gql } = require('apollo-server-express')
export const userTypeDef = gql`
  extend type Query {
    getAllUsers: [User!]
  }

  extend type Mutation {
    signup(input: inputUserCreate!): User!
    login(input: inputLoginUser!): Token
  }
  type Token {
    token: String!
  }
  input inputLoginUser {
    email: String!
    password: String!
  }

  input inputUserCreate {
    name: String!
    email: String!
    password: String!
  }

  type User {
    id: String!
    name: String!
    email: String!
  }
`
