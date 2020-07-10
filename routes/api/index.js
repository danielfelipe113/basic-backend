

const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth/auth.index'));


router.use('/users', require('./user/user.index'));

router.use('/employees', require('./employees/employees.index'));


module.exports = router;
