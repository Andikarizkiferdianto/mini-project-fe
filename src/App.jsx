import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import LandingPage from './components/Landingpage';
import Login from './LoginAdmin/Login';
import DashboardAdmin from './Pages/DashboardAdmin';


// manajemen siswa
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


// manajemen guru
import DashboardGuru from './Pages/ManajemenGuru/DashboardGuru';
import JadwalMengajar from './Pages/ManajemenGuru/JadwalMengajar/JadwalMengajar';
import MataPelajaran from './Pages/ManajemenGuru/Mapel/MataPelajaran';
import DistribusiJam from './Pages/ManajemenGuru/DistribusiJam';
import RiwayatMengajar from './Pages/ManajemenGuru/RiwayatMengajar';


// manajemen keuangan
import DashboardKeuangan from './Pages/ManajemenKeuangan/DashboardKeuangan';
// pembayaran siswa
import BayarTagihan from './Pages/ManajemenKeuangan/PembayaranSiswa/BayarTagihan';
import TunggakanSiswa from './Pages/ManajemenKeuangan/PembayaranSiswa/TunggakanSiswa';
import JenisPembayaran from './Pages/ManajemenKeuangan/PembayaranSiswa/JenisPembayaran';
import TarifPembayaran from './Pages/ManajemenKeuangan/PembayaranSiswa/TarifPembayaran';
import RekapPembayaran from './Pages/ManajemenKeuangan/PembayaranSiswa/RekapPembayaran';
import DataTransaksi from './Pages/ManajemenKeuangan/PembayaranSiswa/DataTransaksi';
import RekapPerSiswa from './Pages/ManajemenKeuangan/PembayaranSiswa/RekapPerSiswa';
import RekapTagihan from './Pages/ManajemenKeuangan/PembayaranSiswa/RekapTagihan';
import RekapPerTanggal from './Pages/ManajemenKeuangan/PembayaranSiswa/RekapPerTanggal';
// Tabungan siswa
import Teller from './Pages/ManajemenKeuangan/TabunganSiswa/Teller';
import RiwayatTabunganSiswa from './Pages/ManajemenKeuangan/TabunganSiswa/RiwayatTabunganSiswa';
import RiwayatTransaksi from './Pages/ManajemenKeuangan/TabunganSiswa/RiwayatTransaksi';
// penerimaan
import TransaksiPenerimaan from './Pages/ManajemenKeuangan/Penerimaan/TransaksiPenerimaan';
import JenisPenerimaan from './Pages/ManajemenKeuangan/Penerimaan/JenisPenerimaan';
import LaporanPenerimaan from './Pages/ManajemenKeuangan/Penerimaan/LaporanPenerimaan';
// belanja
import TransaksiBelanja from './Pages/ManajemenKeuangan/Belanja/TransaksiBelanja';
import JenisBelanja from './Pages/ManajemenKeuangan/Belanja/JenisBelanja';
import LaporanBelanja from './Pages/ManajemenKeuangan/Belanja/LaporanBelanja';
// jurnal
import TransaksiJurnal from './Pages/ManajemenKeuangan/Jurnal/TransaksiJurnal';
import LaporanJurnal from './Pages/ManajemenKeuangan/Jurnal/LaporanJurnal';
// buku besar
import LaporanBukuBesar from './Pages/ManajemenKeuangan/BukuBesar/LaporanBukuBesar';
import NeracaSaldo from './Pages/ManajemenKeuangan/BukuBesar/NeracaSaldo';
import JurnalUmum from './Pages/ManajemenKeuangan/BukuBesar/JurnalUmum';
//laporan keuangan
import PenghasilanKomprehensif from './Pages/ManajemenKeuangan/LaporanKeuangan/PenghasilanKomprehensif';
import PosisiKeuangan from './Pages/ManajemenKeuangan/LaporanKeuangan/PosisiKeuangan';
import ArusKas from './Pages/ManajemenKeuangan/LaporanKeuangan/ArusKas';
import PerubahanAsetNeto from './Pages/ManajemenKeuangan/LaporanKeuangan/PerubahanAsetNeto';
// rencana anggaran
import RealisasiPenerimaan from './Pages/ManajemenKeuangan/RencanaAnggaran/RealisasiPenerimaan';
import RealisasiBelanja from './Pages/ManajemenKeuangan/RencanaAnggaran/RealisasiBelanja';
import SettingPagu from './Pages/ManajemenKeuangan/RencanaAnggaran/SettingPagu';
import APBSInduk from './Pages/ManajemenKeuangan/RencanaAnggaran/APBSInduk';
import APBSDetail from './Pages/ManajemenKeuangan/RencanaAnggaran/APBSDetail';
// anggaran
import RealisasiAnggaran from './Pages/ManajemenKeuangan/RealisasiAnggaran';
import EvaluasiAnggaran from './Pages/ManajemenKeuangan/EvaluasiAnggaran';
//pengaturan akun
import AkunBudgeting from './Pages/ManajemenKeuangan/PengaturanAkun/AkunBudgeting';
import AkunKeuangan from './Pages/ManajemenKeuangan/PengaturanAkun/AkunKeuangan';

// perpus
import DashboardPerpus from './Pages/Perpustakaan/DashboardPerpus';
import DataBuku from './Pages/Perpustakaan/Manajementdata/DataBuku';
import PeminjamanBuku from './Pages/Perpustakaan/Manajementdata/PeminjamanBuku';
// laporan perpus
import LaporanBuku from './Pages/Perpustakaan/Laporan/LaporanBuku';
import LaporanPeminjaman from './Pages/Perpustakaan/Laporan/LaporanPeminjaman';
import LaporanPengembalian from './Pages/Perpustakaan/Laporan/LaporanPengembalian';
import LaporanDenda from './Pages/Perpustakaan/Laporan/LaporanDenda';

// menu aplikasi
import DashboardAplikasi from './Pages/MenuAplikasi/DashboardAplikasi';
import InformasiLembaga from './Pages/MenuAplikasi/InformasiLembaga';
import BannerAplikasi from './Pages/MenuAplikasi/BannerAplikasi';
import SettingUser from './Pages/MenuAplikasi/SettingUser';
import BackupData from './Pages/MenuAplikasi/BackupData';
import SettingAbsensiGPS from './Pages/MenuAplikasi/SettingAbsensiGPS';
import PengembalianBuku from './Pages/Perpustakaan/Manajementdata/PengembalianBuku';
import SettingDenda from './Pages/Perpustakaan/Manajementdata/SettingDenda';

// Manajemen sekolah
import DashboardSekolah from './Pages/ManajemenSekolah/DashboardSekolah';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />

        {/* Manajemen siswa */}
        <Route path="/manajemen-siswa/dashboard" element={<ManajemenSiswa />} />

        {/* kesiswaan */}

        {/* data siswa */}
        <Route path="/manajemen-siswa/data-siswa" element={<DataSiswa />} />
        <Route path="/manajemen-siswa/tambah-siswa" element={<TambahDataSiswa />} />
        <Route path="/manajemen-siswa/edit-siswa/:id" element={<EditDataSiswa />} />

        <Route path="/manajemen-siswa/data-kelas" element={<DataKelas />} />
        <Route path="/manajemen-siswa/kenaikan-kelas" element={<KenaikanKelas />} />
        <Route path="/manajemen-siswa/data-jurusan" element={<DataJurusan />} />
        <Route path="/manajemen-siswa/wali-kelas" element={<WaliKelas />} />
        <Route path="/manajemen-siswa/tahun-ajaran" element={<TahunAjaran />} />
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
        <Route path="/manajemen-guru/jadwal-mengajar" element={<JadwalMengajar />} />
        <Route path="/manajemen-guru/mata-pelajaran" element={<MataPelajaran />} />
        <Route path="/manajemen-guru/Distribusi-jam-mengajar" element={<DistribusiJam />} />
        <Route path="/manajemen-guru/riwayat-mengajar" element={<RiwayatMengajar />} />


        {/* manajemen keuangan */}
        <Route path="/manajemen-keuangan/dashboard" element={<DashboardKeuangan />} />

        {/* pembayaran siswa */}
        <Route path="/manajemen-keuangan/bayar-tagihan" element={<BayarTagihan />} />
        <Route path="/manajemen-keuangan/tunggakan-siswa" element={<TunggakanSiswa />} />
        <Route path="/manajemen-keuangan/jenis-pembayaran" element={<JenisPembayaran />} />
        <Route path="/manajemen-keuangan/tarif-pembayaran" element={<TarifPembayaran />} />
        <Route path="/manajemen-keuangan/rekap-pembayaran" element={<RekapPembayaran />} />
        <Route path="/manajemen-keuangan/data-transaksi" element={<DataTransaksi />} />
        <Route path="/manajemen-keuangan/rekap-per_siswa" element={<RekapPerSiswa />} />
        <Route path="/manajemen-keuangan/rekap-tagihan" element={<RekapTagihan />} />
        <Route path="/manajemen-keuangan/rekap-per_tanggal" element={<RekapPerTanggal />} />
        {/* tabungan siswa */}
        <Route path="/manajemen-keuangan/Teller" element={<Teller />} />
        <Route path="/manajemen-keuangan/riwayat-tabungan" element={<RiwayatTabunganSiswa />} />
        <Route path="/manajemen-keuangan/riwayat-transaksi" element={<RiwayatTransaksi />} />
        {/* penerimaan */}
        <Route path="/manajemen-keuangan/transaksi-penerimaan" element={<TransaksiPenerimaan />} />
        <Route path="/manajemen-keuangan/jenis-penerimaan" element={<JenisPenerimaan />} />
        <Route path="/manajemen-keuangan/laporan-penerimaan" element={<LaporanPenerimaan />} />
        {/* belanja */}
        <Route path="/manajemen-keuangan/transaksi-belanja" element={<TransaksiBelanja />} />
        <Route path="/manajemen-keuangan/jenis-belanja" element={<JenisBelanja />} />
        <Route path="/manajemen-keuangan/laporan-belanja" element={<LaporanBelanja />} />
        {/* jurnal  */}
        <Route path="/manajemen-keuangan/transaksi-jurnal" element={<TransaksiJurnal />} />
        <Route path="/manajemen-keuangan/laporan-jurnal" element={<LaporanJurnal />} />
        {/* buku besar */}
        <Route path="/manajemen-keuangan/laporan-buku-besar" element={<LaporanBukuBesar />} />
        <Route path="/manajemen-keuangan/neraca-saldo" element={<NeracaSaldo />} />
        <Route path="/manajemen-keuangan/jurnal-umum" element={<JurnalUmum />} />
        {/* laporan keuangan */}
        <Route path="/manajemen-keuangan/penghasilan-komperehensif" element={<PenghasilanKomprehensif />} />
        <Route path="/manajemen-keuangan/posisi-keuangan" element={<PosisiKeuangan />} />
        <Route path="/manajemen-keuangan/arus-kas" element={<ArusKas />} />
        <Route path="/manajemen-keuangan/perubahan-aset-neto" element={<PerubahanAsetNeto />} />
        {/* rencana anggaran */}
        <Route path="/manajemen-keuangan/realisasi-penerimaan" element={<RealisasiPenerimaan />} />
        <Route path="/manajemen-keuangan/realisasi-belanja" element={<RealisasiBelanja />} />
        <Route path="/manajemen-keuangan/setting-pagu" element={<SettingPagu />} />
        <Route path="/manajemen-keuangan/apbs-induk" element={<APBSInduk />} />
        <Route path="/manajemen-keuangan/apbs-detail" element={< APBSDetail />} />
        {/* anggaran */}
        <Route path="/manajemen-keuangan/realisasi-anggaran" element={< RealisasiAnggaran />} />
        <Route path="/manajemen-keuangan/evaluasi-anggaran" element={< EvaluasiAnggaran />} />
        {/* pengaturan akun */}
        <Route path="/manajemen-keuangan/akun-keuangan" element={<AkunKeuangan />} />
        <Route path="/manajemen-keuangan/akun-budgeting" element={<AkunBudgeting />} />


        {/* perpus */}
        <Route path="/manajemen-perpustakaan/dashboardperpus" element={<DashboardPerpus />} />
        <Route path="/manajemen-perpustakaan/data-buku" element={<DataBuku />} />
        <Route path="/manajemen-perpustakaan/peminjaman-buku" element={<PeminjamanBuku />} />
        <Route path="/manajemen-perpustakaan/pengembalian-buku" element={<PengembalianBuku />} />
        <Route path="/manajemen-perpustakaan/setting-denda" element={<SettingDenda />} />
        {/* laporan */}
        <Route path="/manajemen-perpustakaan/laporan-buku" element={<LaporanBuku />} />
        <Route path="/manajemen-perpustakaan/laporan-peminjaman" element={<LaporanPeminjaman />} />
        <Route path="/manajemen-perpustakaan/laporan-pengembalian" element={<LaporanPengembalian />} />
        <Route path="/manajemen-perpustakaan/laporan-denda" element={<LaporanDenda />} />

        {/* Menu Aplikasi */}
        <Route path="/manajemen-aplikasi" element={<DashboardAplikasi />} />
        <Route path="/manajemen-aplikasi/informasi-lembaga" element={<InformasiLembaga />} />
        <Route path="/manajemen-aplikasi/banner-aplikasi" element={<BannerAplikasi />} />
        <Route path="/manajemen-aplikasi/setting-user" element={<SettingUser />} />
        <Route path="/manajemen-aplikasi/backup-data" element={<BackupData />} />
        <Route path="/manajemen-aplikasi/setting-absensi-gps" element={<SettingAbsensiGPS />} />

        {/* menu sekolah */}
        <Route path="/manajemen-sekolah/dashboard" element={<DashboardSekolah />} />

      </Routes>
    </Router>
  );
}

export default App;