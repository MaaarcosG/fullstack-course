const { ApolloServer} = require('apollo-server') 
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')

/* Servidor */
const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    context: () => {
        const miContext = 'Hola';
        return{miContext}
    }
});

/* Arranca el servidor */
server.listen().then(({url}) => {
    console.log(`Run server in ${url}`)
});