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
import DataJurusan from './Pages/DataJurusan';
import Ekstrakurikuler from './Pages/Ekstrakurikuler';
import TahunAjaran from './Pages/TahunAjaran';
import WaliKelas from './Pages/WaliKelas';
import DataRaport from './Pages/DataRaport';
import AspekPenilaian from './Pages/AspekPenilaian';
import Semester from './Pages/Semester';
import JenisSemester from './Pages/JenisSemester';
import AbsensiHarian from './Pages/AbsensiHarian';
import RekapAbsensi from './Pages/RekapAbsensi';
import AbsensiMapel from './Pages/AbsensiMapel';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/manajemen-siswa/dashboard" element={<ManajemenSiswa />} />
        <Route path="/manajemen-siswa/data-siswa" element={<DataSiswa />} />
        <Route path="/manajemen-siswa/tambah-siswa" element={<TambahDataSiswa />} />
        <Route path="/manajemen-siswa/edit-siswa/:id" element={<EditDataSiswa />} />
        <Route path="/manajemen-siswa/data-kelas" element={<DataKelas />} />
        <Route path="/manajemen-siswa/kenaikan-kelas" element={<KenaikanKelas />} />
        <Route path="/manajemen-siswa/data-jurusan" element={<DataJurusan />} />
        <Route path="/manajemen-siswa/wali-kelas" element={<WaliKelas />} />
        <Route path="/manajemen-siswa/tahun-ajaran" element={<TahunAjaran />} />
        <Route path="/manajemen-siswa/page-ekstrakurikuler" element={<Ekstrakurikuler />} />
        <Route path="/manajemen-siswa/data-raport" element={<DataRaport />} />
        <Route path="/manajemen-siswa/aspek-penilaian" element={<AspekPenilaian />} />
        <Route path="/manajemen-siswa/semester" element={<Semester />} />
        <Route path="/manajemen-siswa/jenis-semester" element={<JenisSemester />} />
        <Route path="/manajemen-siswa/absensi-harian" element={<AbsensiHarian />} />
        <Route path="/manajemen-siswa/rekap-absensi" element={<RekapAbsensi />} />
        <Route path="/manajemen-siswa/absensi-mapel" element={<AbsensiMapel />} />
      </Routes>
    </Router>
  );
}
export default App;