import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import VehicleService from '../../services/VehicleService';
import VehicleServices from '../../services/VehicleService copy';
import jsPDF from 'jspdf';
import Pagination from './Pagination';
// Function to generate PDF content for a single vehicle
const generatePDFContent = (vehicle) => (
  <Document>
    <Page size="A4">
      <View style={styles.container}>
        <Text style={styles.title}>Vehicle Details</Text>
        <table className="table">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vehicle Type</td>
              <td>{vehicle.vehicleType}</td>
            </tr>
            <tr>
              <td>Number Plate</td>
              <td>{vehicle.numberPlate}</td>
            </tr>
            <tr>
              <td>Start Time</td>
              <td>{vehicle.startTime}</td>
            </tr>
            <tr>
              <td>End Time</td>
              <td>{vehicle.endTime}</td>
            </tr>
            <tr>
              <td>Parking Fee (Rs)</td>
              <td>{vehicle.parkingFee}</td>
            </tr>
          </tbody>
        </table>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const vehiclesPerPage = 5;

  useEffect(() => {
    // Fetch the list of registered vehicles from your backend API
    async function fetchVehicles() {
      try {
        const response = await VehicleServices.getRegisteredVehicles();
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching registered vehicles:', error);
      }
    }

    fetchVehicles();
  }, []);

  // Function to handle generating PDF for a specific vehicle
  // Function to handle generating PDF for a specific vehicle
  const handleGeneratePDF = (vehicle) => {
    const doc = new jsPDF();

    // Define the content for the PDF
    doc.setFontSize(12); // Set font size to 12
    doc.setFont('helvetica', 'normal'); // Set font style
    const pdfContent = `
      Vehicle Type: ${vehicle.vehicleType}

      
      Number Plate: ${vehicle.numberPlate}
      Start Time: ${vehicle.startTime}
      End Time: ${vehicle.endTime}
      Parking Fee (Rs): ${vehicle.parkingFee}
    `;

    // Add the content to the PDF
    doc.text(pdfContent, 10, 10);
    doc.setTextColor(0, 0, 255);


    // Save the PDF as 'vehicle_details.pdf'
    doc.save('vehicle_details.pdf');
  };
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleDeleteVehicle = async (vehicleId) => {
    try {
      // Delete the vehicle on the backend
      console.log("abhaha", vehicleId)
      await VehicleService.deleteVehicle(vehicleId);

      // Remove the vehicle from the frontend list
      const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== vehicleId);
      setVehicles(updatedVehicles);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.numberPlate.toLowerCase().includes(searchInput.toLowerCase())
  );
  console.log('Filtered Vehicles:', filteredVehicles);
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    console.log('Search Input:', event.target.value); // Add this line for debugging
    setCurrentPage(1); // Reset to the first page when the search input changes
  };
  return (
    <div>
      <h1>Registered Vehicles</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Number Plate"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Number Plate</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Parking Fee (Rs)</th>
            <th>Generate PDF</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.slice(
            (currentPage - 1) * vehiclesPerPage,
            currentPage * vehiclesPerPage
          ).map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.vehicleType}</td>
              <td>{vehicle.numberPlate}</td>
              <td>{vehicle.startTime}</td>
              <td>{vehicle.endTime}</td>
              <td>{vehicle.parkingFee}</td>
              <td>
                <button
                  onClick={() => handleGeneratePDF(vehicle)}
                  style={{ background: 'blue', border: 'none', color: 'white' }}
                >
                  Generate PDF
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteVehicle(vehicle.id)}
                  style={{ background: 'red', border: 'none', color: 'white' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(vehicles.length / vehiclesPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Dashboard;
