const express = require("express");

const router = express.Router();

const _sellersController = require("../controllers/sells/sells.controller");
const _productsController = require("../controllers/products/products.controller");
const _authController = require("../controllers/admin/admin.controller");

// RUTAS PUBLICAS
// Rutas no necesitan un token
router.post("/login", _authController.getUserLogin);
router.get("/products/:type/:genre/:others", _productsController.getProduct)
router.use("/public/static", express.static("docs"));

//REGISTRO DEL MIDDLEWARE
router.use([_authController.verifyTokenMiddleware]);

// RUTAS PRIVADAS
router
    // Descrifrar y verificar token
    .get("/verify", _authController.verifyToken)
    //CRUD de productos
    .get("/products/:ref", _productsController.getProduct)
    .get("/products", _productsController.getProducts)
    .post("/products", _productsController.createProduct)
    .put("/products/:id", _productsController.updateProduct)
    .delete("/products/:id", _productsController.deleteProduct)
    //CRUD Ventas
    .get("/sells", _sellersController.getSells)
    .post("/sells", _sellersController.createSell)
    .put("/sells", _sellersController.updateSell)
    .delete("/sells", _sellersController.deleteSell)
    // AGREGAR ARCHIVOS A UN PRODUCTO
    .post("/products/:id/archivos", _productsController.saveFiles);

    module.exports = router;

