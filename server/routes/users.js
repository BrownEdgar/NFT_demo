var express = require('express');
var router = express.Router();


const UserController = require('../controllers/UsersController');
const controller = new UserController()



router.get('/', controller.getAllUsers);
router.post('/sign-up', controller.signUp);

module.exports = router;
