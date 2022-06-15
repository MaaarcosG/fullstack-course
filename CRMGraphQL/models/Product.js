const moongose = require('mongoose');

const ProductSchema = moongose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    existencia: {
        type: Number,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = moongose.model('Producto', ProductSchema);