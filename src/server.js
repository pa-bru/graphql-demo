import { graphql, buildSchema } from 'graphql'
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'

// modules
import user from './modules/user'
import root from './modules/root'

const schema = makeExecutableSchema({
  typeDefs: [root.schema, user.schema],
  resolvers: merge(root.resolvers, user.resolvers),
})

const app = express()

app.use(bodyParser.json())

app.use('/graphql', graphqlExpress({ schema }))

app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(4000, () =>
  console.log('App is listening on localhost:4000/graphql')
)
