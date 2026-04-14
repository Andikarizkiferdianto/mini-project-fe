import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landingpage';
import Login from './LoginAdmin/Login';
import DashboardAdmin from './Pages/DashboardAdmin';
import Sidebar from "./components/Sidebar";
import ManajemenSiswa from './Pages/ManajemenSiswa';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/ManajemenSiswa" element={<ManajemenSiswa />} />
      </Routes>
    </Router>
  );
}
export default App;