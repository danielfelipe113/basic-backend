const router      = require('express').Router();
const controller = require('./user.controller');

const auth        = require('../../auth');

// [POST]
router.post('/login', auth.optional, controller.login);

router.post('/signup', auth.optional, controller.signUp)


// [GET]
router.get('/list', auth.optional, controller.getUsersList);
router.get('/:id', auth.optional, controller.getUserById);

router.get('/:id/companies', auth.optional, controller.getUserCompanies);

module.exports = router;
