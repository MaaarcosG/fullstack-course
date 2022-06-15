const { ApolloServer} = require('apollo-server') 
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')

const connectDB = require('./config/db');

const jwt = require('jsonwebtoken');
require('dotenv').config({path: '.env'});

/* Conectar a la base de datos */
connectDB();

/* Servidor */
const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    context: ({req}) => {
        // console.log(req.headers['authorization'])
        const token = req.headers['authorization'] || '';
        if(token) {
            try {
                const user = jwt.verify(token, process.env.SECRET);
                console.log(user);
                /* obtener accesso al context siempre llamar */
                return {
                    user
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
});

/* Arranca el servidor */
server.listen().then(({url}) => {
    console.log(`Run server in ${url}`)
});