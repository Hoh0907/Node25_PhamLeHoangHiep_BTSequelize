const express = require('express');
const foodRoute = express.Router();
const { getLike,
    getUserLike,
    getReslike,
    createLikeUnlike,
    addRate,
    getUserRate,
    getResRate,
    createUserOrder
} = require('../controllers/foodControllers');
foodRoute.get('/getLike', getLike);
foodRoute.get('/getUserlike', getUserLike);
foodRoute.get('/getResLike', getReslike);
foodRoute.post('/createLikeUnlike', createLikeUnlike);
foodRoute.post('/addRate', addRate);
foodRoute.get('/getUserRate', getUserRate);
foodRoute.get('/getResRate', getResRate);
foodRoute.post('/createUserOrder', createUserOrder)


module.exports = foodRoute;