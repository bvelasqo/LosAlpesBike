const jwt = require("jsonwebtoken");

const SECRET_KEY = "0hH[0.2'.p=.j;l1Auj#N6R&DLIr~~NYdd3mr#1@<R^7}K>@!fYT>ZLWI$u[8Dj";

/**
 * Función para cifrar datos
 * @param {*} data Datos a cifrar
 * @returns
 */
const sign = (data) => {
    return jwt.sign(data, SECRET_KEY, { expiresIn: "8h" });
};

/**
 * Función para descifrar un token y validarlo
 * @param {*} token
 */
const verify = (token) => {
    return jwt.verify(token, SECRET_KEY);
};

module.exports = { sign, verify };