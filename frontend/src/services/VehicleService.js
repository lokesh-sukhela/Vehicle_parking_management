import axios from 'axios'


  const createParkingRecord=async(formData) => {
    const response = await axios.post(`${process.env.REACT_APP_PORTSERVER}/parking`, formData);
    return response
  }

 
  const  deleteVehicle= async (vehicleId) => {
      
        const response = await axios.put
        (`${process.env.REACT_APP_PORTSERVER}/parking/delete`,{
          vehicle_id : vehicleId,
        });
        return response;
      
      }

  
export default  {
  createParkingRecord,deleteVehicle
}
