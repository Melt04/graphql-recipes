/** @format */

declare namespace MyGraphQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation
    errors?: Array<IGraphQLResponseError>
  }

  interface IGraphQLResponseError {
    message: string
    locations?: Array<IGraphQLResponseErrorLocation>

    [propName: string]: any
  }

  interface IGraphQLResponseErrorLocation {
    line: number
    column: number
  }

  interface IQuery {
    __typename: 'Query'
    getCategories: Array<ICategory> | null
    getOneCategory: ICategory | null
    getRecipes: Array<IRecipe> | null
    getOneRecipe: IRecipe | null
    getAllUsers: Array<IUser> | null
    getMyRecipes: Array<IRecipe> | null
  }

  interface IGetOneCategoryOnQueryArguments {
    id?: number | null
  }

  interface IGetOneRecipeOnQueryArguments {
    field: AllowedFields
    value: string
  }

  enum AllowedFields {
    name,
    id,
    category,
    ingredients,
  }

  interface IMutation {
    __typename: 'Mutation'
    createCategory: ICategory
    createRecipe: IRecipe | null
    deleteRecipe: boolean
    updateRecipe: boolean | null
    updateCategory: boolean
    deleteCategory: boolean
    signup: boolean
    login: IToken | null
  }

  interface ICreateCategoryOnMutationArguments {
    input?: IInputCreateCategory | null
  }
  interface IDeleteCategoryOnMutationArguments {
    id: number
  }

  interface IUpdateCategoryOnMutationArguments {
    input?: IInputCreateCategory | null
    id: number
  }
  interface ICreateRecipeOnMutationArguments {
    input?: IInputCreateRecipe | null
  }

  interface IDeleteRecipeOnMutationArguments {
    id?: number | null
  }

  interface IUpdateRecipeOnMutationArguments {
    id?: number | null
    input?: IInputUpdateRecipe | null
  }

  interface ISignupOnMutationArguments {
    input: IInputUserCreate
  }

  interface ILoginOnMutationArguments {
    input: IInputLoginUser
  }

  interface ICategory {
    __typename: 'Category'
    id: number
    name: string
  }

  interface IInputCreateCategory {
    name: string
  }
  interface IInputUpdateRecipe {
    name: string | null
    description: string | null
    ingredients: [string] | null
    category: Int | null
  }

  interface IRecipe {
    __typename: 'Recipe'
    id: string
    name: string
    description: string
    ingredients: string
    category: number
  }

  interface IInputCreateRecipe {
    name: string
    description: string
    ingredients: string[]
    category: number
    user: number
  }

  interface IToken {
    __typename: 'Token'
    token: string
  }

  interface IInputLoginUser {
    email: string
    password: string
  }

  interface IInputUserCreate {
    name: string
    email: string
    password: string
  }

  interface IUser {
    __typename: 'User'
    id: string
    name: string
    email: string
  }
}

// tslint:enable
