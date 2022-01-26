const _jwt = require('../../services/jwt.service');
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getUserLogin = async (req, res) => {
    try {
        let user = req.body;
        if (user.username == "Los Alpes Bike" && user.password == "1597538246") {
            let user_logged = {
                "name": "admin",
                "rol": "admin"
            };
            console.log(user_logged);
            let token = user_logged ? _jwt.sign(user_logged) : null;
            return res.send({
                ok: true,
                message: `Bienvenido ${user_logged.name}`,
                content: {
                    token,
                    name: user_logged.name,
                    rol: user_logged.rol
                },
            });
        } else {
            return res.send({
                ok: false,
                message: "Usuario no encontrado, verificar identificación y/o contraseña.",
                content: "",
            });
        }

    } catch (error) {
        console.log(error);
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando el usuario.",
            content: error,
        });
    }
};


/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const verifyToken = (req, res) => {
    try {
        let token = req.headers.token;
        let user = _jwt.verify(token);
        return res.status(200).send({
            ok: true,
            message: "Token verificado",
            content: user,
        });
    } catch (error) {
        return res.status(401).send({
            ok: false,
            message: "Error verificando el token.",
            content: error,
        });
    }
};

const verifyTokenMiddleware = (req, res, next) => {
    try {
        let token = req.headers.token;
        let user = _jwt.verify(token);
        next();
    } catch (error) {
        return res.send({
            ok: false,
            message: "Middleware - Error verificando el token.",
            content: error,
        });
    }
};

module.exports = {
    getUserLogin,
    verifyToken,
    verifyTokenMiddleware
};