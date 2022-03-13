const { Router } = require('express');
const router = Router();

const UserControllers = require('../../controllers/user/user.controllers');
const authRoutes = require('./auth/auth.routes');
const { userAuth } = require('../../middlewares/auth.middlewares');

// user auth
router.use('/auth', authRoutes);

// router.get('/:uid', userAuth, UserControllers.fetchUserById);

module.exports = router;
