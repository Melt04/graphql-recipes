/** @format */

import { IResolvers } from 'graphql-tools'
import { Category } from '../../database/entity/Category'

export const categoryResolver: IResolvers = {
  Query: {
    getCategories: (): Promise<Category[] | null> => {
      return Category.find()
    },
    getOneCategory: async (
      _: any,
      { id }: MyGraphQL.IGetOneCategoryOnQueryArguments
    ): Promise<Category | null> => {
      const [category]: Category[] = await Category.find({ where: { id } })
      return category
    },
  },
  Mutation: {
    createCategory: async (
      _: any,
      { input }: MyGraphQL.ICreateCategoryOnMutationArguments
    ): Promise<Category | null> => {
      const { name } = <MyGraphQL.IInputCreateCategory>input
      const category = new Category()
      category.name = name
      await category.save()
      return category
    },
  },
}

// module.exports.resolvers = resolvers
