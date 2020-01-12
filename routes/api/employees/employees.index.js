const router      = require('express').Router();
const controller = require('./employees.controller');

const auth        = require('../../auth');


// [GET]
router.get('/list', auth.optional, controller.getUsersList);
router.get('/:id', auth.optional, controller.getUserById);

router.get('/:id/companies', auth.optional, controller.getUserCompanies);

module.exports = router;
