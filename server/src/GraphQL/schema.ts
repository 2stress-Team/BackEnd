import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import { typeDefs as typeDefsUser } from './user/typeDefs';
import { resolvers as resolversUser} from './user/resolvers';

import { makeExecutableSchema } from 'apollo-server-express';

var merge = require('lodash/merge');


const types = [
    typeDefsUser
]

export const typeDefs = mergeTypes(types, { all: true });

export const resolvers = merge({}, 
    resolversUser
)