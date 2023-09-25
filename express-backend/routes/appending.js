// routes/vehicleRoutes.js
const express = require('express');
const vehicleController = require('../model/controller/VehicleParkingController');
// const vehicleController = require('../model/controller/VehicleParkingController');
const router = express.Router();
router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getParkingEntryById);
module.exports = router;
