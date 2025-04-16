const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersControllers');

router.get('/', UserController.getAll);
router.post('/', UserController.create);


module.exports = router;