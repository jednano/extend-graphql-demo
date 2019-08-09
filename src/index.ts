import * as path from 'path'

import { ApolloServer } from 'apollo-server'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'

import resolvers from 'src/resolvers'

async function bootstrap() {
	const schema = await buildSchema({
		resolvers: ((await resolvers) as any) as (Function | string)[],
		emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
		// https://github.com/19majkel94/type-graphql/issues/150#issuecomment-420181526
		validate: false,
	})

	const server = new ApolloServer({
		schema,
		playground: true,
	})

	const { url } = await server.listen(4000)
	console.log(`Server is running, GraphQL Playground available at ${url}`)
}

bootstrap()
