import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
require('dotenv').config();

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, next) => {
			console.log('LOCAL strategy');
			try {
				const userRepository: Repository<User> = getRepository(User);
				const user: User | undefined = await userRepository.findOne({
					email,
				});

				if (!user) return next(null, false); // status 400

				if (!user.checkIfUnencryptedPasswordIsValid(password))
					return next(null, false); // status 400

				return next(false, user);
			} catch (err) {
				return next(err.message); // status 500
			}
		},
	),
);

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // return 401 if format is not token
			secretOrKey: process.env.SECRET as string,
		},
		async (jwtPayload, next) => {
			try {
				const userRepository: Repository<User> = getRepository(User);
				const user: User | undefined = await userRepository.findOne({
					uuid: jwtPayload.uuid,
				});

				if (!user) throw new Error('user not found');

				return next(false, user);
			} catch (err) {
				return next(err.message); // status 500
			}
		},
	),
);