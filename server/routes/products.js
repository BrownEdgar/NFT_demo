var express = require('express');
var router = express.Router();

const ProductsController = require('../controllers/ProductsController');
const { checkToken } = require('../middlewaries');
const controller = new ProductsController()

router.get('/', checkToken, controller.getAllProducts);
router.post('/', controller.addProduct);
router.get('/category', controller.getByCategory);

module.exports = router;
