import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNavigate as navigate, Route, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import "../styles/dashboard.css";
import VehicleParking from '../VehicleParking/VehicleParking';
import Dashboard from '../VehicleParking/table';
import Home from '../VehicleParking/Home';
function Dashboardd() {
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get('token');

    if (!token) {
      navigate('/');
      toast.error('Authentication failed! Please Login.', { autoClose: 1000 });
    }
  }, []);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    cookies.remove('role');
    cookies.remove('Email');
    cookies.remove('token');
    navigate('/');
  };

  return (
    <>
      <div className="menu-bar" id='menu-bar'>
        <div className="menu-buttons" id='menu-buttons'>
          <button className="menu-button">
            <Link to="content" className="menu-button">Home</Link>
          </button>
          <button className="menu-button">
            <Link to="parking" className="menu-button">New vehicle</Link>
          </button>
          <button className="menu-button">
            <Link to="table" className="menu-button">Details</Link>
          </button>
        </div>
        <div id='menu-buttons'>
          <button className="menu-button " onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>
      <Routes>
      <Route path='content' element={<Home />} />
        <Route path='parking' element={<VehicleParking />} />
        <Route path='table' element={<Dashboard />} />    </Routes>
    </>
  );
}

export default Dashboardd;
