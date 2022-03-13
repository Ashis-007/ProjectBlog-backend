const { Router } = require('express');
const router = Router();

const AuthControllers = require('../../../controllers/user/auth/auth.controllers');

router.post('/signup', AuthControllers.signUpUser);
router.post('/login', AuthControllers.loginUser);

module.exports = router;
