// routes/vehicleRoutes.js
const express = require('express');
const vehicleController = require('../model/controller/VehicleParkingController');
// const vehicleController = require('../model/controller/VehicleParkingController');
const router = express.Router();
// router.get('/registered-vehicles', vehicleController.getAllVehicles);


// Create a new parking record
router.post('/', vehicleController.createVehicle);
router.put('/delete',vehicleController.deleteVehiclebyid);



// Retrieve parking records
// router.get('/parking', vehicleController.getVehicles);

module.exports = router;
