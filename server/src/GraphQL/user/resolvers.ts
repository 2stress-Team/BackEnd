import { AuthenticationError } from 'apollo-server-errors';
import  { User } from '../../entities/User';
import {
	signupService,
	SuccessResult,
	ErrorResult,
} from '../../services/userAuthServices';

interface UserToRegister {
	password: string;
	email: string;
}

export const resolvers = {
    Query: {
        hello: () => 'Hello world !',
    },
    Mutation: {
        signUp: async (
			parent: any,
			args: UserToRegister,
		): Promise<User | undefined> => {
			const { password, email } = args;
			try {
				const result = await signupService(
					password,
					email,
				);
	
				return (result as SuccessResult).data.user;
			} catch (error) {
				throw new AuthenticationError((error as ErrorResult).err);
			}
		},

    }
};