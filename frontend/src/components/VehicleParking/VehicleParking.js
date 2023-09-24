import {React, useState } from 'react';
import VehicleService from '../../services/VehicleService'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../src/style.css'
import { toast } from 'react-toastify';
function VehicleParking() {
  const [vehicleType, setVehicleType] = useState('2-wheeler');
  const [numberPlate, setNumberPlate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const indianNumberPlateRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{1,4}$/;

  // Function to validate the number plate
  const isValidNumberPlate = (numberPlate) => {
    return indianNumberPlateRegex.test(numberPlate);
  };
  const handleNumberPlateChange = (e) => {
    setNumberPlate(e.target.value);
  };

  const [parkingFee, setParkingFee] = useState(0); // Initialize parking fee to 0

const calculateParkingFee = (vehicleType, start, end) => {
    const startDateTime = new Date(start);
    const endDateTime = new Date(end);
    const durationInHours = (endDateTime - startDateTime) / (1000 * 60 * 60); // Convert milliseconds to hours

    // Define fee structures for different vehicle types
    const feeStructure = {
      '2-wheeler': [
        { maxHours: 3, fee: 5 },
        { maxHours: 6, fee: 10 },
        { maxHours: 12, fee: 12 },
        { maxHours: 24, fee: 20 },
      ],
      '3-wheeler': [
        { maxHours: 3, fee: 7 },
        { maxHours: 6, fee: 12 },
        { maxHours: 12, fee: 15 },
        { maxHours: 24, fee: 25 },
      ],
      '4-wheeler': [
        { maxHours: 3, fee: 10 },
        { maxHours: 6, fee: 15 },
        { maxHours: 12, fee: 20 },
        { maxHours: 24, fee: 30 },
      ],
    };

    // Find the appropriate fee structure for the vehicle type
    const selectedFeeStructure = feeStructure[vehicleType] || [];

    // Find the fee based on the duration
    let fee = 0;
    for (const tier of selectedFeeStructure) {
      if (durationInHours <= tier.maxHours) {
        fee = tier.fee;
        break;
      }
    }

    // For more than 24 hours, charge 20 per day
    if (durationInHours > 24) {
      const days = Math.floor(durationInHours / 24);
      fee = fee + 20 * days;
    }

    return fee;
  };

  const handleVehicleTypeChange = (e) => {
    const newVehicleType = e.target.value;
    setVehicleType(newVehicleType);
    // Recalculate parking fee when vehicle type is changed
    const fee = calculateParkingFee(newVehicleType, startTime, endTime);
    console.log('Updated Fee:', fee);
    setParkingFee(fee);
  };
  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    // Recalculate parking fee when start time is changed
    const fee = calculateParkingFee(vehicleType,e.target.value, endTime);
    setParkingFee(fee);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    // Recalculate parking fee when end time is changed
    const fee = calculateParkingFee(vehicleType,startTime, e.target.value);
    setParkingFee(fee);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidNumberPlate(numberPlate)) {
      toast.error('Please enter valid number plate details');
      return; // Prevent form submission
    }
    // Create an object to hold the form data
    const startTimeTimestamp = new Date(startTime).getTime();
const endTimeTimestamp = new Date(endTime).getTime();

if (startTimeTimestamp >= endTimeTimestamp) {
  // Display error and prevent form submission
  toast.error('Start time must be greater than end time');
  return;
}
    const formData = {
      vehicleType,
      numberPlate,
      startTime,
      endTime,
      parkingFee,
    };

    try {
      // Call the createParkingRecord function from the service module
      const responseData = await VehicleService.createParkingRecord(formData);

      // Handle the response from the backend, e.g., display a success message
      console.log('Data sent successfully:', responseData);

      // Reset the form fields after successful submission
      setVehicleType('2-wheeler');
      setNumberPlate('');
      setStartTime('');
      setEndTime('');
      setParkingFee(0);
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Error sending data to the backend:', error);
    }
  };
  


  

  return (
    <>
    <h1 className="text-center mt-4">Parking Management System</h1>
    <div className="container">
      
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Vehicle Type:</label>
          <select
            className="form-control"
            style={{ width: '100%' }} // Add this inline style
            value={vehicleType}
            onChange={handleVehicleTypeChange} 
          >
            <option value="2-wheeler">2-wheeler</option>
            <option value="3-wheeler">3-wheeler</option>
            <option value="4-wheeler">4-wheeler</option>
            
          </select>
        </div>
        <div className="form-group">
          <label>Number Plate:</label>
          <input
            style={{ width: '100%' }}
            type="text"
            value={numberPlate}
            onChange={handleNumberPlateChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input
            style={{ width: '100%' }}
            type="datetime-local"
            value={startTime}
            onChange={handleStartTimeChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input
            style={{ width: '100%' }}
            type="datetime-local"
            value={endTime}
            onChange={handleEndTimeChange}
            required
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
            Submit
          </button>
        </div>
        <div className="form-group">
          <label>Parking Fee:</label>
          <span className="parking-fee">{parkingFee} Rs</span>
        </div>
      </form>
    </div>
    </> 
  );
}

export default VehicleParking;