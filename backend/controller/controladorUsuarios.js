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
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({token});
    if(!usuarioConfirmar){
        const error = new Error("Token no válido");
        return res.status(403).json({ msg: error.message });
    }
    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";
        await usuarioConfirmar.save();
        res.json({ msg: "Usuario confirmado correctamente" });
        
    } catch (error) {
        console.log(error);
    }
}
const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if(!usuario){
        const error = new Error("El Usuario no existe");
        return res.status(404).json({ mag: error.message });
    }
    try {
        usuario.token = generarId();
        await usuario.save();
        res.json({ msg: "Hemos enviado un email con las instrucciones para que recuperes tu acceso" });
    } catch (error) {
        console.log(error);
    }

}
const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token });
    if(tokenValido){
        console.log("Token válido");
    }
    else{
        const error = new Error("Token no válido");
        return res.status(404).json({msg: error.message });
    }
}
const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const usuarioValido = await Usuario.findOne({ token });
    if(usuarioValido){
        usuarioValido.password = password;
        usuarioValido.token = "";
        try {
            await usuarioValido.save();
            res.json({ msg: "Password modificado correctamente"});
        } catch (error) {
            console.log(error);
        }
    }
    else{
        const error = new Error("Token no válido");
        return res.status(404).json({  msg: error.message });
    }
}

export { obtenerUsuarios, registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword }