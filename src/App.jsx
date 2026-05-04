import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landingpage';
import Login from './LoginAdmin/Login';
import DashboardAdmin from './Pages/DashboardAdmin';
import ManajemenSiswa from './Pages/ManajemenSiswa/ManajemenSiswa';
import DataSiswa from './Pages/ManajemenSiswa/DataSiswa/DataSiswa';
import TambahDataSiswa from './Pages/ManajemenSiswa/DataSiswa/TambahDataSiswa';
import EditDataSiswa from './Pages/ManajemenSiswa/DataSiswa/EditDataSiswa';
import DataKelas from './Pages/ManajemenSiswa/DataKelas';
import KenaikanKelas from './Pages/ManajemenSiswa/KenaikanKelas';
import DataJurusan from './Pages/ManajemenSiswa/DataJurusan';
import Ekstrakurikuler from './Pages/ManajemenSiswa/Ekstrakurikuler';
import TahunAjaran from './Pages/ManajemenSiswa/TahunAjaran';
import WaliKelas from './Pages/ManajemenSiswa/WaliKelas';
import DataRaport from './Pages/ManajemenSiswa/Raport/DataRaport';
import AspekPenilaian from './Pages/ManajemenSiswa/Raport/AspekPenilaian';
import Semester from './Pages/ManajemenSiswa/Raport/Semester';
import JenisSemester from './Pages/ManajemenSiswa/Raport/JenisSemester';
import AbsensiHarian from './Pages/ManajemenSiswa/Absensi/AbsensiHarian';
import RekapAbsensi from './Pages/ManajemenSiswa/Absensi/RekapAbsensi';
import AbsensiMapel from './Pages/ManajemenSiswa/Absensi/AbsensiMapel';
import DashboardGuru from './Pages/ManajemenGuru/DashboardGuru';
import JadwalMengajar from './Pages/ManajemenGuru/JadwalMengajar/JadwalMengajar';
import MataPelajaran from './Pages/ManajemenGuru/Mapel/MataPelajaran';
import DistribusiJam from './Pages/ManajemenGuru/DistribusiJam';
import RiwayatMengajar from './Pages/ManajemenGuru/RiwayatMengajar';



function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />

        {/* Manajemen siswa */}
        <Route path="/manajemen-siswa/dashboard" element={<ManajemenSiswa />} />
        
        {/* data siswa */}
        <Route path="/manajemen-siswa/data-siswa" element={<DataSiswa />} />
        <Route path="/manajemen-siswa/tambah-siswa" element={<TambahDataSiswa />} />
        <Route path="/manajemen-siswa/edit-siswa/:id" element={<EditDataSiswa />} /> 
        
        {/* kesiswaan */}
        <Route path="/manajemen-siswa/data-kelas" element={<DataKelas />} />
        <Route path="/manajemen-siswa/kenaikan-kelas" element={<KenaikanKelas />} />
        <Route path="/manajemen-siswa/data-jurusan" element={<DataJurusan />} />
        <Route path="/manajemen-siswa/wali-kelas" element={<WaliKelas />} />
        <Route path="/manajemen-siswa/tahun-ajaran" element={<TahunAjaran />} />

        {/* kegiatan */}
        <Route path="/manajemen-siswa/page-ekstrakurikuler" element={<Ekstrakurikuler />} />
       
       {/* raport */}
        <Route path="/manajemen-siswa/data-raport" element={<DataRaport />} />
        <Route path="/manajemen-siswa/aspek-penilaian" element={<AspekPenilaian />} />
        <Route path="/manajemen-siswa/semester" element={<Semester />} />
        <Route path="/manajemen-siswa/jenis-semester" element={<JenisSemester />} />
       
       {/* absensi */}
        <Route path="/manajemen-siswa/absensi-harian" element={<AbsensiHarian />} />
        <Route path="/manajemen-siswa/rekap-absensi" element={<RekapAbsensi />} />
        <Route path="/manajemen-siswa/absensi-mapel" element={<AbsensiMapel />} />
        
        {/* manajemen guru */}
        <Route path="/manajemen-guru/dashboard" element={<DashboardGuru />} />

        {/* jadwal mengajar */}
        <Route path="/manajemen-guru/jadwal-mengajar" element={<JadwalMengajar />} />

        {/* Mata Pelajaran */}
        <Route path="/manajemen-guru/mata-pelajaran" element={<MataPelajaran />} />
        
        {/* distribusi jam mengajar */}
        <Route path="/manajemen-guru/Distribusi-jam-mengajar" element={<DistribusiJam />} />
        
        {/* riwayat mengajar */}
        <Route path="/manajemen-guru/riwayat-mengajar" element={<RiwayatMengajar />} />




      </Routes>
    </Router>
  );
}
export default App;