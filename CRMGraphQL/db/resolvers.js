const User = require('../models/Users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config({path: '.env'});

const createToken = (user, secreta, expiresIn) => {
    console.log(user);
    const {id, nombre, apellido, email} = user;
    return jwt.sign({id}, secreta, {expiresIn});
};

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
        },
        autenticationUser: async (_, {input}) => {
            const {email, password} = input;

            /* 1. Si el usuario existe */
            const existUser = await User.findOne({email});
            if(!existUser){
                throw new Error('El usuario no existe...')
            };

            /* Revisar si el password es correcto */
            const passwordCorrecto = await bcryptjs.compare(password, existUser.password);
            if(!passwordCorrecto){
                throw new Error('El password es incorrecto')
            };


            /* Crear el token */
            return{
                token: createToken(existUser, process.env.SECRET, '24H')
            }
        }
        
        
    }
};

module.exports = resolvers;