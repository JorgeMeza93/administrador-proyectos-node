import express from "express";
import { obtenerUsuarios } from "../controller/controladorUsuarios.js";

const router = express.Router();

router.get("/", obtenerUsuarios);

export default router;