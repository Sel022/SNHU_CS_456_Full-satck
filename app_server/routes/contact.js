const express = require('express');
const router = express.Router();
const ctrlMain = require ('../controllers/contact');

router.get('/', ctrlMain.contact);

module.exports = router;