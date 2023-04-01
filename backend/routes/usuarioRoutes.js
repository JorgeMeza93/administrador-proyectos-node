import express from "express";
import { obtenerUsuarios, registrar, autenticar } from "../controller/controladorUsuarios.js";

const router = express.Router();

router.get("/", obtenerUsuarios);
router.post("/", registrar);
router.post("/login", autenticar);


export default router;