const router      = require('express').Router();
const controller = require('./employees.controller');

const auth        = require('../../auth');


// [GET]
router.get('/list', auth.optional, controller.getEmployeesList);
router.get('/:id', auth.optional, controller.getEmployeeById);

router.get('/:id/companies', auth.optional, controller.getEmployeeCompanies);


// router.post('/:id/companies', auth.optional, controller.setEmployeeCompany);

module.exports = router;
