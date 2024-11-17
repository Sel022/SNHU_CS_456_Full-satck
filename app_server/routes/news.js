const express = require('express');
const router = express.Router();
const ctrlMain = require ('../controllers/news');

router.get('/', ctrlMain.news);

module.exports = router;