const moongose = require("mongoose");

const OrderSchema = moongose.Schema({
    pedido: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    cliente: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client'
    },
    vendedor: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    estado: {
        type: String,
        default: 'EARRING...'
    },
    creado: {
        type: Date,
        default: Date.now()
    }

});

module.exports = moongose.model("Order", OrderSchema);