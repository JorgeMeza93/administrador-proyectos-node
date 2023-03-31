import Usuario from "../modelos/Usuario.js";

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
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);
        
    } catch (error) {
        console.log(error);
    }
}


export { obtenerUsuarios, registrar }