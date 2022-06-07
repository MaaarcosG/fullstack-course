const { ApolloServer} = require('apollo-server') 
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')

const connectDB = require('./config/db');

/* Conectar a la base de datos */
connectDB();

/* Servidor */
const server = new ApolloServer({
    typeDefs, 
    resolvers
});

/* Arranca el servidor */
server.listen().then(({url}) => {
    console.log(`Run server in ${url}`)
});