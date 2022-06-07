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

    input UserInput{
        # ! --> hacer obligatorio la variable
        nombre: String!
        apellido: String!
        email: String!
        password: String!
    }

    type Query{
        obtenerCurso: String

    }

    type Mutation{
        newUser (input: UserInput): User
    }
`;

module.exports = typeDefs;