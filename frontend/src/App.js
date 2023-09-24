import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './style.css';
import SignUpAndSignInCombine from './components/login/SignUpAndSignInCombine';
// import { Dashboard, Edit } from '@mui/icons-material';
import VehicleParking from './components/VehicleParking/VehicleParking';
import Dashboardd from './components/nav/dashoard';
import Dashboard from './components/VehicleParking/table';
function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<SignUpAndSignInCombine />}/>
          <Route path="/dashboard/*" element={<Dashboardd/>}/>
          
        </Routes>
      </Router>
    </>
  );
}
export default App;
