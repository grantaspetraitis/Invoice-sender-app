const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const auth = require('../controllers/auth');

// router.get('/', user.getHome);
router.post('/register', auth.registerUser);
router.post('/login', auth.loginUser);
router.get('/verify/:token', auth.verifyUserEmail);
router.post('/newinvoice', user.sendInvoice);
router.post('/newsingleinvoice', user.sendSingleInvoice);
router.get('/profile', user.getProfile);
router.post('/addcontacts', user.addContact);
router.post('/details', user.addDetails);
router.get('/details', user.getDetails);
router.patch('/details', user.updateDetails);

module.exports = router;