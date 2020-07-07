import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        signIn(email: String!, password: String!): User!
		helloo: String
    }
    type Mutation {
        signUp(email: String!, password: String!): User
    }
    type User {
        uuid: String!
        email: String!
        dateDeNaissance: Date!
        sexe: String!
        password: String!
    }
`
