const express = require('express');
const router = express.Router();
const path = require('path');

const productsController = require('../controllers/mainController');

router.post('/expense',productsController.AddDetails);
router.get('/expense',productsController.getDetails);
router.delete('/expense/:id',productsController.deleteDetails);


module.exports=router;