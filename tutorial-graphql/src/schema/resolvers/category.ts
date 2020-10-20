/** @format */

import { IResolvers } from 'graphql-tools'
import { Category } from '../../database/entity/Category'
import { Recipe } from '../../database/entity/Recipe'
import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from '../../middleware'

export const categoryResolver: IResolvers = {
  Query: {
    getCategories: <any>combineResolvers(
      isAuthenticated,
      (): Promise<Category[] | null> => {
        return Category.find()
      }
    ),
    getOneCategory: <any>combineResolvers(
      isAuthenticated,
      async (
        _: any,
        { id }: MyGraphQL.IGetOneCategoryOnQueryArguments
      ): Promise<Category | undefined> => {
        try {
          const category = await Category.findOne({
            where: { id },
          })
          return category
        } catch (e) {
          console.log(e)
          throw e
        }
      }
    ),
  },
  Mutation: {
    createCategory: <any>combineResolvers(
      isAuthenticated,
      async (
        _: any,
        { input }: MyGraphQL.ICreateCategoryOnMutationArguments
      ): Promise<Category | null> => {
        const { name } = <MyGraphQL.IInputCreateCategory>input
        const category = new Category()
        category.name = name
        try {
          await category.save()
          return category
        } catch (e) {
          console.log(e)
          throw e
        }
      }
    ),
    deleteCategory: <any>combineResolvers(
      isAuthenticated,
      async (
        _: any,
        { id }: MyGraphQL.IDeleteCategoryOnMutationArguments
      ): Promise<boolean> => {
        try {
          const recipe = await Recipe.findOne({
            where: { category: id },
          })
          if (recipe) {
            throw new Error('Cant delete Id, some recipes have that ID')
          }
          const category = await Category.findOne({ where: { id } })
          if (!category) {
            throw new Error('Invalid category ID')
          }
          await category.remove()
          return true
        } catch (e) {
          console.log(e)
          throw e
        }
      }
    ),
    updateCategory: <any>combineResolvers(
      isAuthenticated,
      async (
        _: any,
        { id, input }: MyGraphQL.IUpdateCategoryOnMutationArguments
      ): Promise<boolean> => {
        try {
          const updatedCategory = await Category.update({ id }, { ...input })
          if (updatedCategory) return true
          return false
        } catch (e) {
          console.log(e)
          throw e
        }
      }
    ),
  },
}
