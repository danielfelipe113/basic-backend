

const express = require('express');
const router = express.Router();
const Employee = require('../../models').employee;
const Company = require('../../models').company;

router.get('/', async (req, res) => {
  const employees = await Employee.findAll({
    include: [
      {
        model: Company,
        attributes: ['id', 'name', 'size'],
        required: false,
      }
    ]
  });
  
  console.log('--------------------')
  employees.forEach(e => {
    console.log(e.get({plain: true}))

  })

  console.log('--------------------')

  res.render('employees/list', {employees});
});

module.exports = router;
