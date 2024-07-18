var express = require('express');
var router = express.Router();

const ProductsController = require('../controllers/ProductsController');
const controller = new ProductsController()

router.get('/', controller.getAllProducts);
router.post('/', controller.addProduct);
router.get('/category', controller.getByCategory);

module.exports = router;
