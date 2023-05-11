import express from "express";
import { obtenerUsuarios, registrar, autenticar, confirmar, olvidePassword, comprobarToken } from "../controller/controladorUsuarios.js";

const router = express.Router();

router.get("/", obtenerUsuarios);
router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.get("/olvide-password/:token", comprobarToken);

export default router;