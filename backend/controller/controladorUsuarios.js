import Usuario from "../modelos/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const obtenerUsuarios = (req, res) => {
    res.json({ msg: "Hola Amigos" });
}
const registrar = async (req, res) => {
    const { email } = req.body;
    const existe = await Usuario.findOne({ email });
    if(existe){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message })
    }
    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);
        
    } catch (error) {
        console.log(error);
    }
}
const autenticar = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if(!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
    }
    if(!usuario.confirmado){
        const error = new Error("Usuario no ha sido confirmado");
        return res.status(403).json({ msg: error.message });
    }
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        });

    }
    else{
        const error = new Error("El password es incorrecto");
        res.status(403).json({msg: error.message});
    }
}
const confirmar = async (req, res) => {
    
}

export { obtenerUsuarios, registrar, autenticar, confirmar }