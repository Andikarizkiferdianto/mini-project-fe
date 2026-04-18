import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landingpage';
import Login from './LoginAdmin/Login';
import DashboardAdmin from './Pages/DashboardAdmin';
import ManajemenSiswa from './Pages/ManajemenSiswa';
import DataSiswa from './Pages/DataSiswa';
import DataKelas from './Pages/DataKelas';
import KenaikanKelas from './Pages/KenaikanKelas';
import TambahDataSiswa from './Pages/TambahDataSiswa';
import EditDataSiswa from './Pages/EditDataSiswa';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/manajemen-siswa=dashboard" element={<ManajemenSiswa />} />
        <Route path="/manajemen-siswa=data-siswa" element={<DataSiswa />} />
        <Route path="/manajemen-siswa=tambah-siswa" element={<TambahDataSiswa />} />
        <Route path="/manajemen-siswa=edit-siswa/:id" element={<EditDataSiswa />} />
        <Route path="/manajemen-siswa=data-kelas" element={<DataKelas />} />
        <Route path="/manajemen-siswa=kenaikan-kelas" element={<KenaikanKelas />} />
      </Routes>
    </Router>
  );
}
export default App;