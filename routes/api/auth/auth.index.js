const router      = require('express').Router();
const controller = require('./auth.controller');

const auth        = require('../../auth');

// [POST]
router.post('/login', auth.optional, controller.login);

router.post('/signup', auth.optional, controller.signUp)


// [GET]
// TODO: Get token or something?


module.exports = router;
