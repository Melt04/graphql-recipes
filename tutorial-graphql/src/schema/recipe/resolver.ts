/** @format */

import { IResolvers } from 'graphql-tools'
import { Recipe } from '../../database/entity/Recipe'

const resolvers: IResolvers = {
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
    createRecipe: async (
      _: any,
      { input }: MyGraphQL.ICreateRecipeOnMutationArguments
    ) => {
      const { category, name, description, ingredients } = <
        MyGraphQL.IInputCreateRecipe
      >input
      let recipe = new Recipe()
      recipe.category = category
      recipe.ingredients = ingredients
      recipe.description = description
      recipe.name = name
      await recipe.save()
      return recipe
    },
    updateRecipe: async (
      _: any,
      { id, input }: MyGraphQL.IUpdateRecipeOnMutationArguments
    ) => {
      const { category, description, ingredients, name } = <
        MyGraphQL.IInputCreateRecipe
      >input
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

module.exports.resolvers = resolvers
