const express = require("express");

const router = express.Router();

const _sellersController = require("../controllers/sells/sells.controller");
const _productsController = require("../controllers/products/products.controller");
const _authController = require("../controllers/admin/admin.controller");

// RUTAS PUBLICAS
// Rutas no necesitan un token
router.post("/login", _authController.getUserLogin);
router.get("/bicycles", _productsController.getAllPublicBicycles);
router.get("/clothes", _productsController.getAllClothesGeneral);
router.get("/clothes/men", _productsController.getAllClothesMen);
router.get("/clothes/women", _productsController.getAllPublicClothesWomen);
router.get("/parts", _productsController.getAllPublicParts);
router.get("/accesories", _productsController.getAllPublicAccessories);
router.get("/others", _productsController.getAllPublicOthers);
router.get("/product/:cod", _productsController.getPublicProduct);
router.use("/public/static", express.static("docs"));

//REGISTRO DEL MIDDLEWARE
router.use([_authController.verifyTokenMiddleware]);

// RUTAS PRIVADAS
router
    // Descrifrar y verificar token
    .get("/verify", _authController.verifyToken)
    //CRUD de productos
    .get("/admin/products/:cod", _productsController.getProduct)
    .get("/admin/products", _productsController.getProducts)
    .get("/admin/bicycles", _productsController.getAllBicycles)
    .get("/admin/clothes/men", _productsController.getAllClothesMen)
    .get("/admin/clothes/women", _productsController.getAllClothesWomen)
    .get("/admin/clothes", _productsController.getAllClothesGeneral)
    .get("/admin/accessories", _productsController.getAllAccessories)
    .get("/admin/others", _productsController.getAllOthers)
    .get("/admin/parts", _productsController.getAllParts)
    .post("/admin/products", _productsController.createProduct)
    .put("/admin/products/:id", _productsController.updateProduct)
    .delete("/admin/products/:id", _productsController.deleteProduct)
    //CRUD Ventas
    .get("/admin/sells", _sellersController.getSells)
    .post("/admin/sells", _sellersController.createSell)
    .put("/admin/sells", _sellersController.updateSell)
    .delete("/admin/sells", _sellersController.deleteSell)
    // AGREGAR ARCHIVOS A UN PRODUCTO
    .post("/admin/products/:id/archivos", _productsController.saveFiles);

    module.exports = router;

