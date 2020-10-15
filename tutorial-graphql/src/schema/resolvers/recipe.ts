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
        const [user]: User[] = await User.find({ where: { email } })

        return Recipe.find({ where: { userId: user.id } })
      }
    ),
    getOneRecipe: <any>combineResolvers(
      isAuthenticated,
      async (
        _: any,
        { field, value }: MyGraphQL.IGetOneRecipeOnQueryArguments
      ): Promise<Recipe[]> => {
        const recipe: Recipe[] = await Recipe.find({
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
          const { category, description, ingredients, name } = <
            MyGraphQL.IInputUpdateRecipe
          >input
          let [updatedRecipe]: Recipe[] = await Recipe.find({ where: { id } })
          if (updatedRecipe) {
            updatedRecipe.category = category
              ? category
              : updatedRecipe.category
            updatedRecipe.description = description
              ? description
              : updatedRecipe.description
            updatedRecipe.ingredients = ingredients
              ? ingredients
              : updatedRecipe.ingredients
            updatedRecipe.name = name ? name : updatedRecipe.name

            await updatedRecipe.save()
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
        const recipeToRemove = await Recipe.find({ where: { id } })
        if (recipeToRemove.length > 0) {
          await Recipe.remove(recipeToRemove)
          return true
        }
        return false
      }
    ),
  },
  Recipe: {
    User: async ({ userId }: Recipe): Promise<User> => {
      const [userRecipe]: User[] = await User.find({ where: { id: userId } })

      return userRecipe
    },
  },
}

//module.exports.resolvers = resolvers
