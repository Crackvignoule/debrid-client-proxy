const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const debridRoutes = require('./debridRoutes');

router.use('/user', userRoutes);
router.use('/debrid', debridRoutes);

module.exports = router;
