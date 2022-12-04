const express = require('express');
const foodRoute = require('./foodRoute');
const rootRoute = express.Router();
rootRoute.use('/food', foodRoute);
module.exports = rootRoute;