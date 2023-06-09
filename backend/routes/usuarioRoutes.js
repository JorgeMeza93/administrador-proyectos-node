import express from "express";
import { obtenerUsuarios, registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil } from "../controller/controladorUsuarios.js";
import checkAuth from "../helpers/middleware/checkAuth.js";

const router = express.Router();

router.get("/", obtenerUsuarios);
router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword);

router.get("/perfil", checkAuth, perfil)

export default router;