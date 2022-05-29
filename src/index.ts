import { ApolloServer } from 'apollo-server'
import { context } from './context'
import { schema } from './schema'

export const server = new ApolloServer({
  schema,
  context,
  introspection: true,
})

const port = 5050

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
