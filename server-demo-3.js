var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } = require("graphql")

// Construct a schema, using GraphQL schema language
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        rollDice: {
            type: new GraphQLList(GraphQLInt),
            args: {
                numDice: { type: GraphQLInt },
                numSides: { type: GraphQLInt }
            },
            resolve: (parentValue, { numDice, numSides }) => {
                var output = []
                
                for (var i = 0; i < numDice; i++) {
                    output.push(1 + Math.floor(Math.random() * (numSides || 6)))
                }

                return output
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
