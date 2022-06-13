const { gql } = require("apollo-server");

/* Schema */
const typeDefs = gql`

    type User{
        id: ID
        nombre: String
        apellido: String
        email: String
        created: String
    }
    
    type Token{
        token: String
    }

    input UserInput{
        # ! --> hacer obligatorio la variable
        nombre: String!
        apellido: String!
        email: String!
        password: String!
    }
    
    input AutenticarInput{
        email: String!
        password: String!
    }

    type Query{
        obtenerCurso: String

    }

    type Mutation{
        newUser (input: UserInput): User
        autenticationUser(input: AutenticarInput): Token
    }
`;

module.exports = typeDefs;