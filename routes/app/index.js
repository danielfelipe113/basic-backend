

const express = require('express');
const router = express.Router();
const Employee = require('../../models').employee;
const Company = require('../../models').company;

router.get('/', async (req, res) => {
  const employees = await Employee.findAll();
  
  console.log('--------------------')
  console.log(await employees[0])
  console.log('--------------------')

  res.render('employees/list', {employees});
});

module.exports = router;
