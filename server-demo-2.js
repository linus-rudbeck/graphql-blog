var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } = require("graphql")

// Construct a schema, using GraphQL schema language
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        quoteOfTheDay: {
            type: GraphQLString,
            resolve: () => {
                return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within"
            }
        },
        random: {
            type: GraphQLFloat,
            resolve: () => {
                return Math.random()
            }
        },
        rollThreeDice: {
            type: new GraphQLList(GraphQLInt),
            resolve: () => {
                return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6))
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
