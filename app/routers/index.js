const express = require("express");

const router = express.Router();

const _sellersController = require("../controllers/sells/sells.controller");
const _productsController = require("../controllers/products/products.controller");
const _authController = require("../controllers/admin/admin.controller");

// RUTAS PUBLICAS
// Rutas no necesitan un token
router.get("/bicycles", _productsController.getAllPublicBicycles);
router.get("/clothes", _productsController.getAllClothesGeneral);
router.get("/clothes/men", _productsController.getAllClothesMen);
router.get("/clothes/women", _productsController.getAllPublicClothesWomen);
router.get("/parts", _productsController.getAllPublicParts);
router.get("/accesories", _productsController.getAllPublicAccessories);
router.get("/others", _productsController.getAllPublicOthers);
router.get("/product/:cod", _productsController.getPublicProduct);
router.post("/login", _authController.getUserLogin);
router.use("/public/static", express.static("docs"));

//REGISTRO DEL MIDDLEWARE
// RUTAS PRIVADAS
const rutasProtegidas = express.Router(); 

router.use([_authController.verifyTokenMiddleware])
    // Descrifrar y verificar token
    .get("/verify", _authController.verifyToken)
    //CRUD de productos
    .get("/admin/products/:cod",rutasProtegidas, _productsController.getProduct)
    .get("/admin/products",rutasProtegidas, _productsController.getProducts)
    .get("/admin/bicycles",rutasProtegidas, _productsController.getAllBicycles)
    .get("/admin/clothes/men",rutasProtegidas, _productsController.getAllClothesMen)
    .get("/admin/clothes/women",rutasProtegidas, _productsController.getAllClothesWomen)
    .get("/admin/clothes",rutasProtegidas, _productsController.getAllClothesGeneral)
    .get("/admin/accessories",rutasProtegidas, _productsController.getAllAccessories)
    .get("/admin/others",rutasProtegidas, _productsController.getAllOthers)
    .get("/admin/parts",rutasProtegidas, _productsController.getAllParts)
    .post("/admin/products",rutasProtegidas, _productsController.createProduct)
    .put("/admin/products/:id",rutasProtegidas, _productsController.updateProduct)
    .delete("/admin/products/:id",rutasProtegidas, _productsController.deleteProduct)
    //CRUD Ventas
    .get("/admin/sells",rutasProtegidas, _sellersController.getSells)
    .post("/admin/sells",rutasProtegidas, _sellersController.createSell)
    .put("/admin/sells",rutasProtegidas, _sellersController.updateSell)
    .delete("/admin/sells",rutasProtegidas, _sellersController.deleteSell)
    // AGREGAR ARCHIVOS A UN PRODUCTO
    .post("/admin/products/:id/:category/archivos",rutasProtegidas, _productsController.saveFiles);
    module.exports = router;