import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import Routes from './routes';
import './middlewares/passport';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { ApolloServer } from 'apollo-server-express';
// import { schema } from './graphQl';
import { typeDefs, resolvers } from './graphQl/schema';
import { makeExecutableSchema } from 'apollo-server-express';
const path = require('path');


const app: Express = express();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', Routes);

app.get('/', (req, res) => {
	res
	.status(200)
	//.end('Type /api to use it')
	.sendFile(path.join(__dirname+'/index.html'));
});

// Swagger set up
const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'API 2stress - Documentation',
			version: '1.0.0',
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT || 3000}/api/`,
			},
		],
	},
	apis: [
		'./src/entity/User.ts',
		'./src/controllers/AuthController.ts',
		'./src/controllers/UserController.ts',
	],
};
const specs = swaggerJsdoc(options);
app.use('/doc', swaggerUi.serve);
app.get(
	'/doc',
	swaggerUi.setup(specs, {
		explorer: true,
	}),
);

// GraphQL startup
export const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})
const server = new ApolloServer({ schema });
// const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

export default app;
