import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const conectarBD = async () => {
    try {
        const conexion = await mongoose.connect(process.env.Mongo_Uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const url = `${conexion.connection.host}:${conexion.connection.port}`;
        console.log(`MongoDB conectado en ${url}`);
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

export default conectarBD;