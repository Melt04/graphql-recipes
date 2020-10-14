// tslint:disable
// graphql typescript definitions

declare namespace MyGraphQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
getCategories: Array<ICategory> | null;
getOneCategory: ICategory | null;
getRecipes: Array<IRecipe> | null;
getOneRecipe: IRecipe | null;
getAllUsers: Array<IUser> | null;
}

interface IGetOneCategoryOnQueryArguments {
id?: number | null;
}

interface IGetOneRecipeOnQueryArguments {
id?: number | null;
}

interface IMutation {
__typename: "Mutation";
createCategory: ICategory;
createRecipe: IRecipe | null;
deleteRecipe: boolean;
updateRecipe: IRecipe | null;
signup: IUser;
login: IToken | null;
}

interface ICreateCategoryOnMutationArguments {
input?: IInputCreateCategory | null;
}

interface ICreateRecipeOnMutationArguments {
input?: IInputCreateRecipe | null;
}

interface IDeleteRecipeOnMutationArguments {
id?: number | null;
}

interface IUpdateRecipeOnMutationArguments {
id?: number | null;
input?: IInputCreateRecipe | null;
}

interface ISignupOnMutationArguments {
input: IInputUserCreate;
}

interface ILoginOnMutationArguments {
input: IInputLoginUser;
}

interface ICategory {
__typename: "Category";
id: number;
name: string;
}

interface IInputCreateCategory {
name: string;
}

interface IRecipe {
__typename: "Recipe";
id: string;
name: string;
description: string;
ingredients: string;
category: number;
}

interface IInputCreateRecipe {
name: string;
description: string;
ingredients: string;
category: number;
}

interface IToken {
__typename: "Token";
token: string;
}

interface IInputLoginUser {
email: string;
password: string;
}

interface IInputUserCreate {
name: string;
email: string;
password: string;
}

interface IUser {
__typename: "User";
id: string;
name: string;
email: string;
}
}

// tslint:enable
