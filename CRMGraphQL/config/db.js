const moongose = require('mongoose');
require('dotenv').config({path: '.env'});
const connectDB = async () => {
    try{
        await moongose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        });
        console.log('Connected to MongoDB');
    } catch(error){
        console.log('Error');
        console.log(error);
        process.exit(1); // detiene la base de datos
    }
};

module.exports = connectDB;