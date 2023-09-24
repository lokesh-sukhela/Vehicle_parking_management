// controllers/vehicleController.js
const db = require('../entities');
const vehicletable=db.Vehicle;

const createVehicle = async (req, res) => {
  try {
    const { vehicleType, numberPlate, startTime, endTime, parkingFee } = req.body;

    const vehicle = await vehicletable.create({
      vehicleType,
      numberPlate,
      startTime,
      endTime,
      parkingFee,
    });

    res.status(201).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// exports.getVehicles = async (req, res) => {
//   try {
//     const vehicles = await vehicletable.findAll();
//     res.json(vehicles);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicletable.findAll();
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching registered vehicles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteVehiclebyid = async (req, res) => {
  console.log("id",req.body.vehicle_id)
  if(req.body.vehicle_id){
    await vehicletable.destroy({
      where : {
        id : req.body.vehicle_id,
      }
    });
    res.send({statusCode: 200, message: "deleted"})
    console.log("delete Successful!")
  } else{
    res.status(400).send("delete failed!")
  }
};

const getParkingEntryById = async (req, res) => {

  const { id } = req.params;
  try {
    const parkingEntry = await vehicletable.findByPk(id); 
    if (!parkingEntry) {
      return res.status(404).json({ error: 'Parking entry not found' });
    }
    res.json(parkingEntry);
  } catch (error) {
    console.error('Error fetching parking entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
    createVehicle,getAllVehicles,getParkingEntryById,deleteVehiclebyid
  };
