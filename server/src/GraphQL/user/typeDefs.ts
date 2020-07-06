import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {

    }
    type Mutation {

    }
    type User {
        uuid: String!
        email: String!
        dateDeNaissance: Date!
        sexe: String!
        password: String!
    }
`
