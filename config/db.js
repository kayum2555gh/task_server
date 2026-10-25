const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        const con = await mongoose.connect(process.env.MONGODB_ATLAS_URL);
        console.log(`Data base connected ${mongoose.connection.host}`)

    } catch (error) {
        console.log(`Connection fail form the database`)
        console.log(error);
    }
}

module.exports = connectDB;