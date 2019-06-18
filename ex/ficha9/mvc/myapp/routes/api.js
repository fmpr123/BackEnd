const express = require('express');
const router = express.Router();

var person_controller=require('../controllers/personController');

router.get('/person/:id',person_controller.person_detail);

module.exports=router;