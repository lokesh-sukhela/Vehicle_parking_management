import axios from 'axios'


const VehicleServices = {
  getRegisteredVehicles: async () => {
    const response = await axios.get(`${process.env.REACT_APP_PORTSERVER}/registered-vehicles`);
    return response
  }
  }
export default VehicleServices;