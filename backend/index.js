import express from "express";
import conectarBD from "./config/db.js";
import dotenv from "dotenv";
import usuarioRouter from "./routes/usuarioRoutes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
conectarBD();

app.use(express.json());
app.use("/api/usuarios", usuarioRouter)
app.listen(PORT, () => {
    console.log(`Servidor ha iniciado en el puerto ${PORT}`);
})