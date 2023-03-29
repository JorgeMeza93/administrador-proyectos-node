import express from "express";

const app = express();

app.listen(4500, () => {
    console.log("Servidor ha iniciado en el puerto 4500");
})