/* Importacion de cada modelo  */
const User = require('../models/Users');
const Producto = require('../models/Product');
const Clients = require('../models/Clients');
const Orders = require('../models/Orders');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config({path: '.env'});

const createToken = (user, secreta, expiresIn) => {
    console.log(user);
    const {id, nombre, apellido, email} = user;
    return jwt.sign({id, nombre, apellido, email}, secreta, {expiresIn});
};

/* 
    pass = twKm0MxtfHHosD4w
    Resolvers 
*/
const resolvers = {
    Query: {
        obtenerUsurio: async (_, { token }) => {
            const usuarioId = await jwt.verify(token, process.env.SECRET)
            return usuarioId
        },
        obtenerProducto: async () => {
            try {
                const producto = await Producto.find({});
                return producto
            } catch (error) {
                console.log(error);
            }
        },
        obtenerProductoId: async (_, {id}) => {
            /* 1. revisas si el producto existe */
            const producto = await Producto.findById(id);
            if(!producto){
                throw new Error('Producto no existe')
            }
            return producto
        },
        obtenerCliente: async () => {
            try {
                const clients = await Clients.find({});
                return clients;
            } catch (error) {
                console.log(error)
            }
        },
        obtenerClienteVendedor: async (_, {}, ctx) => {
            try {
                const clients = await Clients.find({vendedor: ctx.user.id.toString()});
                return clients;
            } catch (error) {
                console.log(error)
            }
        },
        obtenerEspecifico: async (_, {id}, ctx) => {
            /* 1. Revisar si existe el cliente */
            const client = await Clients.findById(id);
            
            if(!client){
                throw new Error('Cliente no encontrado')
            }

            /* 2. Quien lo crea pueda verlo */
            if(client.vendedor.toString() !== ctx.user.id){
                throw new Error('No tienes credenciales')
            }

            return client
        },
        obtenerPedidos: async () => {
            try {
                const pedidos = await Orders.find({});
                return pedidos
            } catch (error) {
                console.log(error)
            }
        },
        obtenerPedidosVendedor: async (_, {}, ctx) => {
            try {
              const pedidos = await Orders.find({vendedor: ctx.user.id});
              return pedidos;
            } catch (error) {
              console.log(error);
            }
        },
        obtenerPedido: async (_, {id}, ctx) => {
            /* 1. Si el pedido existe o no */
            const pedido = await Orders.findById(id);
            if(!pedido){
                throw new Error ('Pedido no encontrado')
            }

            /* 2. Solo quien lo crea puede verlo  */
            if(pedido.vendedor.toString() !== ctx.user.id){
                throw new Error('No tienes las credenciales para hacer esta operacion')
            }

            /* 3. Retornar el resultado*/
            return pedido;

        },
        obtenerPedidoEstados: async (_, {estado}, ctx) => {
            const pedidos = await Orders.find({vendedor: ctx.user.id, estado});
            return pedidos;
        }
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
                token: createToken(existUser, process.env.SECRET, '24h')
            }
        },
        newProduct: async (_, {input}) => {
            try {
                const producto = new Producto(input);
                /* almacenar en la bd */
                const data = await producto.save();
                return data
            } catch (error) {
                console.log(error)
            }
        },
        actualizarProducto: async (_, {id, input}) => {
            /* 1. revisas si el producto existe */
            let producto = await Producto.findById(id);
            if(!producto){
                throw new Error('Producto no existe')
            }
            /* 2. Almacenar en data bases */
            producto = await Producto.findOneAndUpdate({_id: id}, input, {new: true});
            return producto;

        },
        eliminarProducto: async (_, {id}) => {
            /* 1. revisas si el producto existe */
            let producto = await Producto.findById(id);
            if(!producto){
                throw new Error('Producto no existe')
            }

            /* Eliminar producto */
            await Producto.findByIdAndDelete({_id: id});
            return 'Producto eliminado'

        },
        newClient: async (_, {input}, ctx) => {
            console.log(ctx);

            /* 1. Verificar si el cliente esta registrado */
            const { email } = input;
            const clients = await Clients.findOne({email});

            if(clients){
                throw new Error('Cliente ya registrado')
            }

            const newClient = new Clients(input);

            /* 2. Asignar el vendedor */
            newClient.vendedor = ctx.user.id;

            /* 3. Guardarlo en la base de datos */
            try {;
                const data = await newClient.save();
                return data;
            } catch (error) {
                console.log(error);
            }
            
        },
        actualizarClient: async (_, {id, input}, ctx) => {
            /* Verificar si existe */
            let clients = await Clients.findById(id);
            if(!clients){
                throw new Error('Cliente no existe')
            }

            /* Verificar si es el vendedor quien edita */
            if(clients.vendedor.toString() !== ctx.user.id){
                throw new Error('No tienes credenciales')
            }

            /* Guardar el cliente */
            clients = await Clients.findByIdAndUpdate({_id: id}, input, {new: true});
            return clients;
        },
        eliminarClient: async (_, {id}, ctx) => {
            /* Verificar si existe */
            let clients = await Clients.findById(id);
            if(!clients){
                throw new Error('Cliente no existe')
            }

            /* Verificar si es el vendedor quien edita */
            if(clients.vendedor.toString() !== ctx.user.id){
                throw new Error('No tienes credenciales')
            }

            /* Eliminar clientes */
            await Clients.findOneAndDelete({_id: id});
            return 'Cliente eliminado'
        },
        newOrder: async (_, {input}, ctx) => {
            const {cliente} = input;

            /* verificar si existe cliente */
            let clients = await Clients.findById(cliente);

            if(!clients){
                throw new Error('Cliente no existe');
            }

            /* verificar si el cliente es del vendedor */
            if(clients.vendedor.toString() !== ctx.user.id){
                throw new Error('No tienes credenciales');
            }

            /* revisar que el stock este disponible */
            if (input.pedido) {
              for await (const data of input.pedido) {
                const { id } = data;
                // console.log(id);
                const producto = await Producto.findById(id);

                if (data.cantidad > producto.existencia) {
                  throw new Error(
                    `El articulo: ${producto.nombre} excede la cantidad disponible`
                  );
                } else {
                  /* restar la cnatidad disponible */
                  producto.existencia -= data.cantidad;
                  await producto.save();
                }
              }
            }
            
            /* Crear un nuevo pedido */
            const newPedidos = new Orders(input);
            
            /* asigarle un vendedor */
            newPedidos.vendedor = ctx.user.id;

            /* guardarlo en la base de datos */
            const result = await newPedidos.save();
            return result;
        },
        actualizarPedido: async (_, {id, input}, ctx) => {
            const {cliente} = input;

            /* Verificar si el pedido existe */
            const existePedido = await Producto.findById(id);
            if(!existePedido){
                throw new Error('El pedido no existe');
            }

            /* Verificar si el cliente existe */
            const existeCliente = await Producto.findById(cliente);
            if(!existeCliente){
                throw new Error('El cliente no existe');
            }

            /* Cliente pertener al vendedor */
            if(existeCliente.vendedor.toString() !== ctx.user.id){
                throw new Error('No tienes credenciales');
            }
            /* Revisar el stock */
            for await (const data of input.pedido) {
                const {id} = data;
                // console.log(id);
                const producto = await Producto.findById(id);

                if(data.cantidad > producto.existencia){
                    throw new Error(`El articulo: ${producto.nombre} excede la cantidad disponible`);
                } else{
                    /* restar la cnatidad disponible */
                    producto.existencia -= data.cantidad;
                    await producto.save();
                }
            };

            /* Guardar el pedido */
            const resultado = await Orders.findByIdAndUpdate({_id: id}, input, {new: true});
            return resultado
        },
        eliminarPedido: async (_, {id}, ctx) => {
            /* 1. revisas si el producto existe */
            let pedido = await Orders.findById(id);
            if(!pedido){
                throw new Error('Pedido no existe')
            }

            if(pedido.vendedor.toString() !== ctx.user.id){
                throw new Error('No tienes credenciales');
            }

            /* Eliminar producto */
            await Orders.findByIdAndDelete({_id: id});
            return 'Producto eliminado'
        }
    }
};

module.exports = resolvers;