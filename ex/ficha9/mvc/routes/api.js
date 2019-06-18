var express = require('express');
var router = express.Router();

// Require our controllers.
var person_controller = require('../controllers/personController');

// person notes

//GET request for one person.
router.get('/person/:id', person_controller.person_detail);

//GET request for list of all persons.
//router.get('/persons', person_controller.person_list);

module.exports = router;