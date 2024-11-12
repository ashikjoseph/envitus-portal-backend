
const deviceController= require('../Controllers/deviceController')

const userController= require('../Controllers/userController')

const dashboardController= require('../Controllers/dashboardController')

const jwtMiddleware = require('../middleware/jwtMiddleware')



const express = require("express");


const router = new express.Router();

router.post('/login', userController.login)

router.get('/device-list',jwtMiddleware, deviceController.deviceList)

router.get('/device/sensor/dashboardData',dashboardController.getDashboardData )






module.exports = router;
