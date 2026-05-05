import { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import Swal from "sweetalert2";
import { useNavigate, useLocation, Link } from "react-router-dom";
import LogoSAP from "../assets/LogoSAP.png";

function Sidebar() {
    const [openMenu, setOpenMenu] = useState(null);
    const nav = useNavigate();
    const location = useLocation();

    // api
    const isSiswa = location.pathname.startsWith("/manajemen-siswa");
    const isGuru = location.pathname.startsWith("/manajemen-guru");
    const isPerpus = location.pathname.startsWith("/perpustakaan");
    const isKeuangan = location.pathname.startsWith("/manajemen-keuangan");
    const isAplikasi = location.pathname.startsWith("/manajemen-aplikasi");

    const handleLogout = () => {
        setTimeout(() => nav("/dashboard-admin"), 100);
    };

    // manajemen siswa
    const menuSiswa = [
        { path: "/manajemen-siswa/dashboard", 
            icon: "ri-home-9-fill", 
            label: "Dashboard" 
        },

        { isSection: true, label: "MENU" },

        {
            icon: "ri-team-fill",
            label: "Kesiswaan",
            children: [
                { path: "/manajemen-siswa/data-siswa", label: "Data Siswa" },
                { path: "/manajemen-siswa/kenaikan-kelas", label: "Kenaikan Kelas" },
                { path: "/manajemen-siswa/data-kelas", label: "Data Kelas" },
                { path: "/manajemen-siswa/data-jurusan", label: "Data Jurusan" },
                { path: "/manajemen-siswa/tahun-ajaran", label: "Tahun Ajaran" },
                { path: "/manajemen-siswa/wali-kelas", label: "Wali Kelas" },
            ],
        },
        {
            icon: "ri-list-check-2",
            label: "Kegiatan",
            children: [
                { path: "/manajemen-siswa/page-ekstrakurikuler", label: "Ekstrakurikuler" },
            ],
        },
        {
            icon: "ri-file-text-fill",
            label: "E-Raport",
            children: [
                { path: "/manajemen-siswa/data-raport", label: "Data Raport" },
                { path: "/manajemen-siswa/aspek-penilaian", label: "Aspek Penilaian" },
                { path: "/manajemen-siswa/semester", label: "Semester" },
                { path: "/manajemen-siswa/jenis-semester", label: "Jenis Semester" },
            ],
        },
        {
            icon: "ri-user-follow-fill",
            label: "Absensi",
            children: [
                { path: "/manajemen-siswa/absensi-harian", label: "Absensi Harian" },
                { path: "/manajemen-siswa/rekap-absensi", label: "Rekap Absensi" },
                { path: "/manajemen-siswa/absensi-mapel", label: "Absensi Mapel" },
            ],
        },
    ];

    // manajemen guru
    const menuGuru = [
        {
            path: "/manajemen-guru/dashboard",
            icon: "ri-home-9-fill",
            label: "Dashboard",
        },

        { isSection: true, label: "MENU" },

        {
            path: "/manajemen-guru/jadwal-mengajar",
            icon: "ri-calendar-2-fill",
            label: "Jadwal Mengajar",
        },
        {
            path: "/manajemen-guru/mata-pelajaran",
            icon: "ri-book-open-fill",
            label: "Mata Pelajaran",
        },
        {
            path: "/manajemen-guru/Distribusi-jam-mengajar",
            icon: "ri-time-fill",
            label: "Distribusi Jam",
        },
        {
            path: "/manajemen-guru/riwayat-mengajar",
            icon: "ri-history-line",
            label: "Riwayat Mengajar",
        },
    ];

    // manajemen Keuangan
    const menuKeuangan = [
        { path: "/manajemen-keuangan/dashboard", 
            icon: "ri-home-9-fill", 
            label: "Dashboard" 
        },

        { isSection: true, label: "MENU KEUANGAN" },

        {
            icon: "ri-wallet-fill",
            label: "Pembayaran Siswa",
            children: [
                { path: "/manajemen-keuangan/bayar-tagihan", label: "Bayar Tagihan" },
                { path: "/manajemen-keuangan/tunggakan-siswa", label: "Tunggakan Siswa" },
                { path: "/manajemen-keuangan/jenis-pembayaran", label: "Jenis Pembayaran" },
                { path: "/manajemen-keuangan/tarif-pembayaran", label: "Tarif Pembayaran" },
                { path: "/manajemen-keuangan/rekap-pembayaran", label: "Rekap Pembayaran Bulanan" },
                { path: "/manajemen-keuangan/data-transaksi", label: "Data Transaksi" },
                { path: "/manajemen-keuangan/rekap-per_siswa", label: "Rekap Per Siswa" },
                { path: "/manajemen-keuangan/rekap-per_tanggal", label: "Rekap Per Tanggal" },
                { path: "/manajemen-keuangan/rekap-tagihan", label: "Rekap Tagihan" },
            ],
        },
        {
            icon: "ri-coin-fill",
            label: "Tabungan Siswa",
            children: [
                { path: "", label: "Teller" },
            ],
        },
        
    ];

    // manajemen perpustakaan
    const menuPerpus = [
        { path: "/perpustakaan/dashboardperpus", icon: "ri-dashboard-fill", label: "Dashboard" },

        { isSection: true, label: "MANAJEMEN DATA" },

        { path: "/perpustakaan/data-buku", icon: "ri-book-3-fill", label: "Data Buku" },
        { path: "/perpustakaan/peminjaman-buku", icon: "ri-book-read-fill", label: "Peminjaman Buku" },
        { path: "/perpustakaan/pengembalian-buku", icon: "ri-history-fill", label: "Pengembalian Buku" },
        { path: "/perpustakaan/setting-denda", icon: "ri-settings-4-fill", label: "Setting Denda" },

        { isSection: true, label: "LAPORAN" },

        {
            icon: "ri-file-list-3-fill",
            label: "Laporan",
            children: [
                { path: "/perpustakaan/laporan-buku", label: "Laporan Buku" },
                { path: "/perpustakaan/laporan-peminjaman", label: "Laporan Peminjaman" },
                { path: "/perpustakaan/laporan-pengembalian", label: "Laporan Pengembalian" },
                { path: "/perpustakaan/laporan-denda", label: "Laporan Denda" },
            ],
        },
    ];

    // manajemen aplikasi
    const menuAplikasi = [
        { path: "/manajemen-aplikasi", icon: "ri-home-9-fill", label: "Dashboard" },
        { isSection: true, label: "MENU" },
        { path: "/manajemen-aplikasi/informasi-lembaga", icon: "ri-information-fill", label: "Informasi Lembaga" },
        { path: "/manajemen-aplikasi/banner-aplikasi", icon: "ri-image-fill", label: "Banner Aplikasi" },
        { path: "/manajemen-aplikasi/setting-user", icon: "ri-user-settings-fill", label: "Setting User" },
        { path: "/manajemen-aplikasi/backup-data", icon: "ri-database-2-fill", label: "Backup Data" },
        { path: "/manajemen-aplikasi/setting-absensi-gps", icon: "ri-map-pin-fill", label: "Setting Absensi GPS" },
    ];


    // menu
    const menuItems = isSiswa ? menuSiswa : isGuru ? menuGuru : isPerpus ? menuPerpus : isKeuangan ? menuKeuangan : isAplikasi ? menuAplikasi : [];

    // auto buka parent kalau ada child aktif
    useEffect(() => {
        menuItems.forEach((item, index) => {
            if (item.children?.some(child => child.path === location.pathname)) {
                setOpenMenu(index);
            }
        });
    }, [location.pathname]);

    return (
        <div className="w-60 min-h-screen pt-16">

            {/* topbar */}

            <div className="fixed top-0 left-60 right-0 h-16 bg-gray-100 flex items-center justify-between px-6 shadow z-50">
                {/* kiri */}
                <button className="bg-violet-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <i className="ri-folder-3-fill"></i>
                    {isSiswa ? "Manajemen Siswa" : isGuru ? "Manajemen Guru" : isPerpus ? "Manajemen Perpustakaan" : isKeuangan ? "Manajemen Keuangan" : isAplikasi ? "Manajemen Aplikasi" : "Dashboard"}
                </button>

                {/* kanan */}
                <div className="flex items-center gap-2 text-violet-600 font-medium">
                    <i className="ri-user-3-line"></i>
                    SAP
                </div>
            </div>

            <div className="fixed overflow-y-auto top-0 left-0 h-full w-60 bg-gradient-to-b from-indigo-900 via-violet-800 to-indigo-900 text-white shadow-lg flex flex-col">

                {/* LOGO SAP */}
                <div className="bg-white text-violet-700 rounded-xl p-3 flex items-center mt-5 gap-3 mb-6 mx-3">
                    <img src={LogoSAP} alt="logo" className="h-8 w-auto" />
                    <h1 className="font-bold text-lg">SAP</h1>
                </div>

                <nav className="flex-1 px-3 text-sm">
                    {menuItems.map((item, index) => {
                        const isActiveParent = item.children?.some(
                            (child) => child.path === location.pathname
                        );

                        return item.isSection ? (
                            <p
                                key={index}
                                className="mt-4 mb-2 text-xs uppercase tracking-wide text-indigo-300 font-semibold"
                            >
                                {item.label}
                            </p>
                        ) : item.children ? (
                            <div key={index}>
                                <button
                                    onClick={() =>
                                        setOpenMenu(openMenu === index ? null : index)
                                    }
                                    className={`flex items-center justify-between w-full py-2 px-3 rounded-md transition ${isActiveParent
                                        ? "bg-violet-600 font-semibold"
                                        : "hover:bg-violet-700"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <i className={`${item.icon} text-lg`}></i>
                                        {item.label}
                                    </div>

                                    <i
                                        className={`ri-arrow-down-s-line transition-transform duration-300 ${openMenu === index ? "rotate-180" : ""
                                            }`}
                                    ></i>
                                </button>

                                <div
                                    className={`ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${openMenu === index
                                        ? "max-h-96 opacity-100"
                                        : "max-h-0 opacity-0"
                                        }`}
                                >
                                    {item.children.map((child, i) => (
                                        <Link
                                            key={i}
                                            to={child.path}
                                            className={`block py-2 px-3 rounded-md text-sm transition ${location.pathname === child.path
                                                ? "bg-violet-500 font-semibold"
                                                : "hover:bg-violet-600"
                                                }`}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={index}
                                to={item.path}
                                className={`flex items-center gap-3 py-2 px-3 rounded-md transition ${location.pathname === item.path
                                    ? "bg-violet-600 font-semibold"
                                    : "hover:bg-violet-700"
                                    }`}
                            >
                                <i className={`${item.icon} text-lg`}></i>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* kembali */}
                <div className="p-3 border-t border-indigo-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 py-2 px-3 rounded-md bg-gradient-to-r hover:bg-violet-600 font-bold transition"
                    >
                        <i className="ri-arrow-left-line"></i>
                        Kembali
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;