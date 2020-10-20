/** @format */

import { IResolvers } from 'graphql-tools'
import { Recipe } from '../../database/entity/Recipe'
import { Context } from '../../utils/context/context'
import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from '../../middleware'
import { User } from '../../database/entity/User'

export const recipeResolver: IResolvers = {
  Query: {
    getRecipes: <any>combineResolvers(
      isAuthenticated,
      async (): Promise<Recipe[]> => {
        const recipe = await Recipe.find()

        return recipe
      }
    ),
    getMyRecipes: <any>combineResolvers(
      isAuthenticated,
      async (_: any, __: any, { email }: Context): Promise<Recipe[]> => {
        const user = await User.findOne({ where: { email } })
        if (user) {
          return Recipe.find({ where: { userId: user.id } })
        }
        return []
      }
    ),
    getOneRecipe: <any>combineResolvers(
      isAuthenticated,
      async (
        _: any,
        { field, value }: MyGraphQL.IGetOneRecipeOnQueryArguments
      ): Promise<Recipe | undefined> => {
        const recipe = await Recipe.findOne({
          where: { [field]: value },
        })
        return recipe
      }
    ),
  },
  Mutation: {
    createRecipe: <any>(
      combineResolvers(
        isAuthenticated,
        async (
          _: any,
          { input }: MyGraphQL.ICreateRecipeOnMutationArguments,
          { email }: Context
        ) => {
          const { category, name, description, ingredients, user } = <
            MyGraphQL.IInputCreateRecipe
          >input
          let recipe = new Recipe()
          recipe.category = category
          recipe.ingredients = ingredients
          recipe.description = description
          recipe.name = name
          recipe.userId = user
          await recipe.save()
          return recipe
        }
      )
    ),
    updateRecipe: <any>(
      combineResolvers(
        isAuthenticated,
        async (
          _: any,
          { id, input }: MyGraphQL.IUpdateRecipeOnMutationArguments
        ) => {
          const updatedRecipe = await Recipe.update({ id }, { ...input })
          if (updatedRecipe) {
            return true
          }

          return false
        }
      )
    ),
    deleteRecipe: <any>combineResolvers(
      isAuthenticated,
      async (
        _: any,
        { id }: MyGraphQL.IDeleteRecipeOnMutationArguments
      ): Promise<Boolean> => {
        const recipeToRemove = await Recipe.findOne({ where: { id } })
        if (recipeToRemove) {
          await Recipe.remove(recipeToRemove)
          return true
        }
        return false
      }
    ),
  },
  Recipe: {
    User: async ({ userId }: Recipe): Promise<User | undefined> => {
      const userRecipe = await User.findOne({
        where: { id: userId },
      })

      return userRecipe
    },
  },
}

//module.exports.resolvers = resolvers
