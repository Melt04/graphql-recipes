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
helloCategory: string | null;
helloRecipe: string | null;
helloWorld: string;
}

interface IHelloWorldOnQueryArguments {
name?: string | null;
}

interface ICategory {
__typename: "Category";
id: number;
name: string;
}

interface IMutation {
__typename: "Mutation";
createHello: number | null;
createUser: IUser;
}

interface ICreateHelloOnMutationArguments {
id?: number | null;
}

interface ICreateUserOnMutationArguments {
inputOptions?: IInputUserCreate | null;
}

interface IRecipie {
__typename: "Recipie";
id: string;
name: string;
email: string;
ingredients: string;
category: number;
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
pasword: string;
}
}

// tslint:enable
