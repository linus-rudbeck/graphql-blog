var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql")

// Construct a schema, using GraphQL schema language
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => {
                return "Hello world 2"
            }
        }
    }
})

// Construct a schema, using GraphQL schema language
var schema = new GraphQLSchema({ query: RootQuery })

// Configure and start application
var app = express()
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
)
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")
