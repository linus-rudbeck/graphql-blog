var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } = require("graphql")

const db = { message: "Default message" }

// Construct a schema, using GraphQL schema language
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        message: {
            type: GraphQLString,
            resolve: () => {
                return db.message;
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        setMessage: {
            type: GraphQLString,
            args: {
                message: { type: GraphQLString }
            },
            resolve(_, { message }){
                db.message = message;
                return message;
            }
        }
    })
})

// Construct a schema, using GraphQL schema language
var schema = new GraphQLSchema({ query: RootQuery, mutation })

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
