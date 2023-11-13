const express = require('express');
const router = express.Router();
const StaffController= require('../controllers/StaffController');

router.get('/', StaffController.renderHome);
 
module.exports = router;