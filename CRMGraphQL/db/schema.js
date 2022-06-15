const { gql } = require("apollo-server");

/* Schema */
const typeDefs = gql`

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

    input ProductoInput{
        nombre: String!
        existencia: Int!
        precio: Float!

    }

    input ClientInput{
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        telefono: String
    }

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

    type Product{
        id: ID
        nombre: String
        existencia: Int
        precio: Float
        created: String
    }

    type Client{
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        telefono: String
        vendedor: ID
    }

    type Query{
        # Usuarios
        obtenerUsurio(token: String!): User 

        # Productos
        obtenerProducto: [Product]
        obtenerProductoId(id: ID!): Product 

        # Clientes
        obtenerCliente: [Client]
        obtenerClienteVendedor: [Client]
        obtenerEspecifico(id: ID!): Client
    }

    type Mutation{
        # Usuarios
        newUser (input: UserInput): User
        autenticationUser(input: AutenticarInput): Token

        # Productos
        newProduct (input: ProductoInput): Product
        actualizarProducto(id: ID!, input: ProductoInput): Product
        eliminarProducto(id:ID!): String

        # Clientes
        newClient (input: ClientInput): Client
        actualizarClient(id: ID!, input: ClientInput): Client
        eliminarClient(id: ID!): String
    }
`;

module.exports = typeDefs;
