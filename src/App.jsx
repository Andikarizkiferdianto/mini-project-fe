import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landingpage';
import Login from './LoginAdmin/Login';
import DashboardAdmin from './Pages/DashboardAdmin';
import Sidebar from "./components/Sidebar";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cc" element={<Sidebar />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;