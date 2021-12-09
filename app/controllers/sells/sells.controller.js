const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();


/**
 * Método de consultar todas las ventas
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
 const getSells = async (req, res) => {
    try {
        let sql = "select * from Products ";
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "All Sells",
            content: rows,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "An error has occurred querying the Sells",
            content: error,
        });
    }
};


/**
 * Método para crear un ventas
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const createSell = async (req, res) => {
    try {
        let Sell = req.body;
        let sql = `INSERT INTO public.Sells (createdAt, productId, total, cantidad) 
      VALUES(current_date, $0, $1, $2 )`;
        let data = [];
        data[0] = Sell.createdAt;
        data[1] = Sell.productId;
        data[2] = Sell.total;
        data[3] = Sell.cantidad;

        let result = await _pg.executeSqlData(sql, data);
        let status = result.rowCount == 1 ? 201 : 400;
        return res.status(status).send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Sell created" : "Sell dont created",
            content: Sell,
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: "an error has ocurring creating the Sell ",
            content: error,
        });
    }
};

/**
 * Método para actualizar un ventas
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const updateSell = async (req, res) => {
    try {
        let id = req.params.id;
        let Sell = req.body;
        let sql = `UPDATE public.Sells SET productId=$0, total=$1, 
      cantidad=$2 WHERE id=$3`;
        let data = [];
        data[0] = Sell.productId;
        data[1] = Sell.total;
        data[2] = Sell.cantidad;
        data[3] = id;

        let result = await _pg.executeSqlData(sql, data);
        return res.send({
            ok: result.rowCount == 1,
            message:
                result.rowCount == 1 ? "Sell modificated" : "Sell dont monificated",
            content: Sell,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "an error has ocurring modificating the Sell ",
            content: error,
        });
    }
};

/**
 * Método para eliminar ventas
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const deleteSell = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `DELETE FROM sells where id = $0`;
        let result = await _pg.executeSqlData(sql, [id]);
        return res.send({
            ok: result.rowCount == 1,
            message:
                result.rowCount == 1 ? "Sell deleted" : "Sell dont deleted",
            content: id,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message:"an error has ocurring delating the Sell ",
            content: error,
        });
    }
};


module.exports = {
    getSells,
    createSell,
    deleteSell,
    updateSell
}