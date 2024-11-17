const express = require('express');
const router = express.Router();
const ctrlMain = require ('../controllers/meals');

router.get('/', ctrlMain.meals);

module.exports = router;