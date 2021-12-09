const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();
const { createFolder, saveFile, readDirectory } = require("../../services/fs.service");


/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getPublicProducts = async (req, res) => {
    try {
        let type = req.params.type;
        let genre = req.params.genre;
        let others = req.params.others;
        let sql = "select * from Products where tipo = '"+ type +"' and genre = '"+ genre + "'  and others = '"+others+"' and estado='NORMAL'" ;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All products",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the products",
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
        let ref = req.params.ref;
        let sql = "select * from products WHERE referencia='" + ref + "' and estado='NORMAL'";
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        rows = rows.map((product) => {
            let path = `./docs/products/${product.id}`;
            product.images = readDirectory(path);
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
        let sql = `INSERT INTO public.products ("name", precio, referencia, stock, tipo, descripcion, genero, otros, estado) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, 'NORMAL')`;
        let data = [];
        data[0] = product.name;
        data[1] = product.price;
        data[2] = product.ref;
        data[3] = product.stock;
        data[4] = product.type;
        data[5] = product.description;
        data[6] = product.genre;
        data[7] = product.others;

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
        let sql = `UPDATE public.products SET "name"=$1, precio=$2, referencia=$3, 
      stock=$4, tipo=$5, descripcion=$6, genero=$7, otros=$8, estado=$9 WHERE id=$10`;
        let data = [];
        data[0] = product.name;
        data[1] = product.price;
        data[2] = product.ref;
        data[3] = product.stock;
        data[4] = product.type;
        data[5] = product.description;
        data[6] = product.genre;
        data[7] = product.others;
        data[8] = product.state;
        data[9] = id;

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
        let sql = `UPDATE public.products SET estado='ELIMINADO' WHERE id=$1;  `;
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
        let files = req.files;
        let image = files.imagen;
        let pathProducts = `./docs/products/${id}/`;
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
            "select * from products";
        let result = await _pg.executeSql(sql);
        let rows = result.rows;

        // Recorrer los productos para agregarle las imagenes
        rows = rows.map((product) => {
            let path = `./docs/products/${product.id}`;
            product.images = readDirectory(path);
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
module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    saveFiles,
    getPublicProducts,
};