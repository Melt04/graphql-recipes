/** @format */

import { IResolvers } from 'graphql-tools'
import { Category } from '../../database/entity/Category'
import { Recipe } from '../../database/entity/Recipe'

export const recipeResolver: IResolvers = {
  Query: {
    getRecipes: (): Promise<Recipe[]> => {
      return Recipe.find()
    },
    getOneRecipe: async (
      _: any,
      { id }: MyGraphQL.IGetOneRecipeOnQueryArguments
    ): Promise<Recipe> => {
      const [recipe]: Recipe[] = await Recipe.find({ where: { id } })
      return recipe
    },
  },
  Mutation: {
    createRecipe: async (_: any, { input }: any) => {
      const { category, name, description, ingredients } = input
      let recipe = new Recipe()
      recipe.category = category
      recipe.ingredients = ingredients
      recipe.description = description
      recipe.name = name
      await recipe.save()
      return recipe
    },
    updateRecipe: async (_: any, { id, input }: any) => {
      const { category, description, ingredients, name } = input
      const [updatedRecipe]: Recipe[] = await Recipe.find({ where: { id } })
      if (updatedRecipe) {
        updatedRecipe.category = category
        updatedRecipe.description = description
        updatedRecipe.ingredients = ingredients
        updatedRecipe.name = name
        await updatedRecipe.save()
        return true
      }
      return false
    },
    deleteRecipe: async (
      _: any,
      { id }: MyGraphQL.IDeleteRecipeOnMutationArguments
    ): Promise<Boolean> => {
      const recipeToRemove = await Recipe.find({ where: { id } })
      if (recipeToRemove.length > 0) {
        await Recipe.remove(recipeToRemove)
        return true
      }
      return false
    },
  },
}

//module.exports.resolvers = resolvers
