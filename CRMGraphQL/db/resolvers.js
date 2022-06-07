const User = require('../models/Users');
const bcryptjs = require('bcryptjs')

/* 
    pass = twKm0MxtfHHosD4w
    Resolvers 
*/
const resolvers = {
    Query: {
        obtenerCurso: () => 'Algo'

    },

    Mutation: {
        newUser: async (_, {input}) => {
            /* 
                1. Revisar si el usuario ya esta registrado.
                2. Hashear password
                3. Guardar en la base de datos
            */

            const {email, password} = input;
            const existUser = await User.findOne({email});
            console.log(existUser);
            
            // Revisar si ya existe
            if(existUser){
                throw new Error('El usuario ya esta creado!');
            }
            
            const salt = await bcryptjs.genSaltSync(10);
            input.password = await bcryptjs.hash(password, salt);   

            // Guardar en base de datos
            try{
                const usuario = new User(input);
                usuario.save(); // guardar base de datos
                return usuario;
            } catch(error) {
                console.log(error)
            }
        }
    }
};

module.exports = resolvers;