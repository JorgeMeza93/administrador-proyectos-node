import express from "express";
import { obtenerUsuarios, registrar, autenticar, confirmar } from "../controller/controladorUsuarios.js";

const router = express.Router();

router.get("/", obtenerUsuarios);
router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar)

export default router;