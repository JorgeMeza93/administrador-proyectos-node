import express from "express";
import { obtenerUsuarios, registrar } from "../controller/controladorUsuarios.js";

const router = express.Router();

router.get("/", obtenerUsuarios);
router.post("/", registrar)

export default router;