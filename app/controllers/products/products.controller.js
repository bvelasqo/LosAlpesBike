const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();
const { createFolder, saveFile, readDirectory } = require("../../services/fs.service");


/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getAllPublicBicycles = async (req, res) => {
    try {
        let sql = `select codigo, nombre, precio, caracteristicas from public."Productos" where categoria = 1 and estado = 'Disponible'`;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All Bicycles",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the Bicycles",
            content: error,
        });
    }
};

/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
 const getAllPublicClothesGeneral = async (req, res) => {
    try {
        let sql = `select codigo, nombre, precio, caracteristicas from public."Productos" where categoria = 2 and estado = 'Disponible' and categoria = 4`;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All Clothes",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the clothes",
            content: error,
        });
    }
};


/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getAllPublicClothesMen = async (req, res) => {
    try {
        let sql = `select codigo, nombre, precio, caracteristicas from public."Productos" where categoria = 2 and estado = 'Disponible'`;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All Men's Clothes",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the Men's Clothes",
            content: error,
        });
    }
};



/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
 const getAllPublicClothesWomen = async (req, res) => {
    try {
        let sql = `select codigo, nombre, precio, caracteristicas from public."Productos" where categoria = 4 and estado = 'Disponible'`;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All Women's clothes",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the Women's clothes",
            content: error,
        });
    }
};

/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
 const getAllPublicParts = async (req, res) => {
    try {
        let sql = `select codigo, nombre, precio, caracteristicas from public."Productos" where categoria = 6 and estado = 'Disponible'`;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All Women's clothes",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the Women's clothes",
            content: error,
        });
    }
};

/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
 const getAllPublicAccessories = async (req, res) => {
    try {
        let sql = `select codigo, nombre, precio, caracteristicas from public."Productos" where categoria = 5 and estado = 'Disponible'';`
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All accessories",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the accessories",
            content: error,
        });
    }
};

/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
 const getAllPublicOthers = async (req, res) => {
    try {
        let sql = `select codigo, nombre, precio, caracteristicas from public."Productos" where categoria = 3 and estado = 'Disponible'`;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All Women's clothes",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the Women's clothes",
            content: error,
        });
    }
};


/**
 * Método para consultar un producto
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getPublicProduct = async (req, res) => {
    try {
        let cod = req.params.cod;
        let sql = `select * from public."Productos" WHERE codigo='${cod}' and estado = 'Disponible'`;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        rows = rows.map((product) => {
            let path = `./docs/products/${product.codigo}`;
            product.foto = readDirectory(path);
            return product;
        });
        return res.send({
            ok: true,
            message: "product searched ",
            content: rows[0],
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the bikes",
            content: error,
        });
    }
};

/**
 * Método para crear un producto
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const createProduct = async (req, res) => {
    try {
        let product = req.body;
        let sql = `INSERT INTO public."Productos" (nombre, precio, caracteristicas, stock, estado, categoria, foto)
      VALUES($1, $2, $3, $4, 'Disponible', $5, $6)`;
        let data = [];
        data[0] = product.nombre;
        data[1] = product.precio;
        data[2] = product.catacteristicas;
        data[3] = product.stock;
        data[4] = product.categoria;
        data[5] = product.foto;

        let result = await _pg.executeSqlData(sql, data);
        let status = result.rowCount == 1 ? 201 : 400;
        return res.status(status).send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Product created" : "Product dont created",
            content: product,
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: "an error has ocurring creating the product ",
            content: error,
        });
    }
};

/**
 * Método para actualizar un producto
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const updateProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let product = req.body;
        let sql = `UPDATE public."Productos" SET nombre=$1, precio=$2, caracteristicas=$3, 
      stock=$4, estado=$5, foto = $6 WHERE id=$7`;
        let data = [];
        data[0] = product.nombre;
        data[1] = product.precio;
        data[2] = product.caracteristicas;
        data[3] = product.stock;
        data[4] = product.estado;
        data[5] = product.foto;
        data[6] = id;

        let result = await _pg.executeSqlData(sql, data);
        return res.send({
            ok: result.rowCount == 1,
            message:
                result.rowCount == 1 ? "Product modificated" : "product dont monificated",
            content: product,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "an error has ocurring modificating the product ",
            content: error,
        });
    }
};

/**
 * Método para eliminar producto
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const deleteProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `UPDATE public."Productos" SET estado = 'Eliminado' WHERE id=$1;`;
        let result = await _pg.executeSqlData(sql, [id]);
        return res.send({
            ok: result.rowCount == 1,
            message:
                result.rowCount == 1 ? "Product deleted" : "Product dont deleted",
            content: id,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message:"an error has ocurring delating the product ",
            content: error,
        });
    }
};

const saveFiles = async (req, res) => {
    try {
        let id = req.params.id;
        let category = req.params.category;
        let files = req.files;
        let image = files.imagen;
        let pathProducts = `./docs/products/${category}/${id}/`;
        createFolder(pathProducts);
        saveFile(`${pathProducts}${image.name}`, image.data);

        return res.send({
            ok: true,
            message: "File up",
            content: {},
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: "an error has ocurring inserting the file ",
            content: error,
        });
    }
};

const getProducts = async (req, res) => {
    try {
        let sql =
            `select * from public."Productos";`;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;

        // Recorrer los productos para agregarle las imagenes
        rows = rows.map((product) => {
            let path = `./docs/products/${product.cod}`;
            product.foto = readDirectory(path);
            return product;
        });
        return res.send({
            ok: true,
            message: "Productos consultados",
            content: rows,
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: "Ha ocurrido un error consultando los archivos.",
            content: error,
        });
    }
};

/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
 const getAllBicycles = async (req, res) => {
    try {
        let sql = `select codigo, nombre, precio, caracteristicas from public."Productos" where categoria = 1 `;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All Bicycles",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the Bicycles",
            content: error,
        });
    }
};

/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
 const getAllClothesGeneral = async (req, res) => {
    try {
        let sql = `select codigo, nombre, precio, caracteristicas from public."Productos" where categoria = 2  and categoria = 4`;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All Clothes",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the clothes",
            content: error,
        });
    }
};


/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getAllClothesMen = async (req, res) => {
    try {
        let sql = `select codigo, nombre, precio, caracteristicas from public."Productos" where categoria = 2 `;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All Men's Clothes",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the Men's Clothes",
            content: error,
        });
    }
};



/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
 const getAllClothesWomen = async (req, res) => {
    try {
        let sql = `select codigo, nombre, precio, caracteristicas from public."Productos" where categoria = 4 `;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All Women's clothes",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the Women's clothes",
            content: error,
        });
    }
};

/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
 const getAllParts = async (req, res) => {
    try {
        let sql = `select codigo, nombre, precio, caracteristicas from public."Productos" where categoria = 6;`;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All Women's clothes",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the Women's clothes",
            content: error,
        });
    }
};

/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
 const getAllAccessories = async (req, res) => {
    try {
        let sql = `select codigo, nombre, precio, caracteristicas from public."Productos" where categoria = 5;`;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All accessories",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the accessories",
            content: error,
        });
    }
};

/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
 const getAllOthers = async (req, res) => {
    try {
        let sql = 'select codigo, nombre, precio, caracteristicas from public."Productos" where categoria = 3 ;';
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All Women's clothes",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the Women's clothes",
            content: error,
        });
    }
};


/**
 * Método para consultar un producto
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getProduct = async (req, res) => {
    try {
        let cod = req.params.cod;
        let sql = `select * from public."Productos" WHERE codigo=${cod} `;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        rows = rows.map((product) => {
            let path = `./docs/products/${product.codigo}`;
            product.foto = readDirectory(path);
            return product;
        });
        return res.send({
            ok: true,
            message: "product searched ",
            content: rows[0],
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the bikes",
            content: error,
        });
    }
};



module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    saveFiles,
    getAllOthers,
    getAllAccessories,
    getAllParts,
    getAllClothesMen,
    getAllPublicOthers,
    getPublicProduct,
    getAllBicycles,
    getAllClothesGeneral,
    getAllClothesWomen,
    getAllPublicBicycles,
    getAllPublicClothesGeneral,
    getAllPublicClothesMen,
    getAllPublicClothesWomen,
    getAllPublicParts,
    getAllPublicAccessories,
};