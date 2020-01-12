

const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));

router.use('/app', require('./app'));

module.exports = router;
