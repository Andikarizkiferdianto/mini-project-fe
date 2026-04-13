import { useState } from "react";
import "remixicon/fonts/remixicon.css";
import Swal from "sweetalert2";
import { useNavigate, useLocation, Link } from "react-router-dom";
import LogoSAP from '../assets/LogoSAP.png'



function Sidebar() {
    const [openMenu, setOpenMenu] = useState(null);
    const nav = useNavigate();
    const location = useLocation();

    const handleLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Yakin ingin logout?",
            text: "Kamu akan kembali ke halaman login.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Logout",
            cancelButtonText: "Batal",
            confirmButtonColor: "#1e3a8a",
            cancelButtonColor: "#dc2626",
        }).then((r) => {
            if (r.isConfirmed) {
                Swal.fire({
                    title: "Berhasil Logout!",
                    icon: "success",
                    timer: 1200,
                    showConfirmButton: false,
                });
                setTimeout(() => nav("/login"), 1200);
            }
        });
    };

    const menuItems = [
        { path: "/", icon: "ri-home-9-fill", label: "Dashboard" },

        { isSection: true, label: "MENU" },

        {
            icon: "ri-team-fill",
            label: "Kesiswaan",
            children: [
                { path: "/", label: "Data Siswa" },
                { path: "/", label: "Kenaikan Kelas" },
                { path: "/", label: "Data Kelas" },
                { path: "/", label: "Data Jurusan" },
                { path: "/", label: "Tahun Ajaran" },
                { path: "/", label: "Wali Kelas" },
            ],
        },
        {
            icon: "ri-list-check-2",
            label: "Kegiatan",
            children: [
                { path: "/", label: "Ekstrakurikuler" },
            ],
        },

        {
            icon: "ri-file-text-fill",
            label: "E-Raport",
            children: [
                { path: "/", label: "Data Raport" },
                { path: "/", label: "Aspek Penilaian" },
                { path: "/", label: "Semester" },
                { path: "/", label: "Jis Semester" },
            ],
        },
        {
            icon: "ri-user-follow-fill",
            label: "Absensi",
            children: [
                { path: "/", label: "Absensi Harian" },
                { path: "/", label: "Rekap Absensi" },
                { path: "/", label: "Absensi Mapel" },
            ],
        },
    ];

    return (
        <div className="w-60 min-h-screen">
            <div className="fixed overflow-y-auto top-0 left-0 h-full w-60 bg-gradient-to-b from-indigo-900 via-violet-800 to-indigo-900 text-white shadow-lg flex flex-col">

                {/* LOGO */}
                <div className="bg-white text-violet-700 rounded-xl p-3 flex items-center mt-5 gap-3 mb-6 mx-3">
                    <img src={LogoSAP} alt="logo" className="h-8 w-auto" />
                    <h1 className="font-bold text-lg">SAP</h1>
                </div>

                <nav className="flex-1 px-3 text-sm">
                    {menuItems.map((item, index) =>
                        item.isSection ? (
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
                                    className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-violet-700 transition"
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


                                {/* submenu */}
                                <div
                                    className={`ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${openMenu === index
                                        ? "max-h-96 opacity-100"
                                        : "max-h-0 opacity-0"
                                        }`}>
                                    {item.children.map((child, i) => (
                                        <Link
                                            key={i}
                                            to={child.path}
                                            className="block py-3 px-3 rounded-md text-sm hover:bg-violet-600 transition"
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
                                className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-violet-700 transition"
                            >
                                <i className={`${item.icon} text-lg`}></i>
                                {item.label}
                            </Link>
                        )
                    )}
                </nav>

                {/* LOGOUT */}
                <div className="p-3 border-t border-indigo-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 py-2 px-3 rounded-md bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 font-bold transition"
                    >
                        <i className="ri-logout-box-line"></i>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
