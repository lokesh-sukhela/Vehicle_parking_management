// routes/vehicleRoutes.js
const express = require('express');
const vehicleController = require('../model/controller/VehicleParkingController');
// const vehicleController = require('../model/controller/VehicleParkingController');
const router = express.Router();
router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getParkingEntryById);
// router.delete("/:id",vehicleController.deleteVehiclebyid);



// Create a new parking record
// router.post('/', vehicleController.createVehicle);



// Retrieve parking records
// router.get('/parking', vehicleController.getVehicles);

module.exports = router;
