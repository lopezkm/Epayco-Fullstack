const { Router } = require('express');
const userRouter = require('./users.js');

const router = Router();

router.use( '/users', userRouter);

module.exports = router;