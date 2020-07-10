const router      = require('express').Router();
const controller = require('./user.controller');

const auth        = require('../../auth');


// [GET]
router.get('/list', auth.optional, controller.getUsersList);
router.get('/:id', auth.optional, controller.getUserById);

module.exports = router;
