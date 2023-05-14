import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Usuario from "../../modelos/Usuario.js"

dotenv.config();
const checkAuth = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -__v");
            console.log(req.usuario);
            return next();
        } catch (error) {
            return res.status(404).json({ msg: "Ha ocurrido un error"});
        }
    }
    if(!token){
        const error = new Error("Token no válido");
        res.status(401).json({ msg: error.message });
    }
    next();
}

export default checkAuth;