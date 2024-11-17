const express = require('express');
const router = express.Router();
const ctrlMain = require ('../controllers/rooms');

router.get('/', ctrlMain.rooms);

module.exports = router;