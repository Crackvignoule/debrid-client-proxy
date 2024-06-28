const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const debridRoutes = require('./debridRoutes');
const magnetRoutes = require('./magnetRoutes');

router.use('/user', userRoutes);
router.use('/debrid', debridRoutes);
router.use('/magnet', magnetRoutes);

module.exports = router;
