import { AuthenticationError } from 'apollo-server-errors';

import  { User } from '../../entities/User';

export const resolvers = {
    Query: {
        hello: () => 'Hello world !',
    },
    Mutation: {

    }
};