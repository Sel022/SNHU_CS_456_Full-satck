const express = require('express');
const router = express.Router();
const ctrlMain = require ('../controllers/about');

router.get('/', ctrlMain.about);

module.exports = router;