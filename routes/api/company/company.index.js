const router      = require('express').Router();
const controller = require('./user.controller');

const auth        = require('../../auth');

// [POST]
router.post('/login', auth.optional, controller.login);

router.post('/signup', auth.optional, controller.signUp)


// [GET]
router.get('/list', auth.required, controller.getUsersList);


module.exports = router;
