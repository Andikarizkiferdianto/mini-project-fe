import { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import Swal from "sweetalert2";
import { useNavigate, useLocation, Link } from "react-router-dom";
import LogoSAP from "../assets/LogoSAP.png";

function Sidebar() {
    const [openMenu, setOpenMenu] = useState(null);
    const nav = useNavigate();
    const location = useLocation();

    const handleLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Berhasil Kembali",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
        });

        setTimeout(() => nav("/dashboard-admin"), 1200);
    };

    const menuItems = [
        { path: "/manajemen-siswa=dashboard", icon: "ri-home-9-fill", label: "Dashboard" },

        { isSection: true, label: "MENU" },

        {
            icon: "ri-team-fill",
            label: "Kesiswaan",
            children: [
                { path: "/manajemen-siswa=data-siswa", label: "Data Siswa" },
                { path: "/manajemen-siswa=data-kelas", label: "Data Kelas" },
            ],
        },
        {
            icon: "ri-list-check-2",
            label: "Kegiatan",
            children: [
                { path: "/ekskul", label: "Ekstrakurikuler" },
            ],
        },
        {
            icon: "ri-file-text-fill",
            label: "E-Raport",
            children: [
                { path: "/raport", label: "Data Raport" },
            ],
        },
        {
            icon: "ri-user-follow-fill",
            label: "Absensi",
            children: [
                { path: "/absensi", label: "Absensi Harian" },
            ],
        },
    ];

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

            {/* TOPBAR */}
            <div className="fixed top-0 left-60 right-0 h-16 bg-gray-100 flex items-center justify-between px-6 shadow z-40">

                {/* Kiri */}
                <button className="bg-violet-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <i className="ri-folder-3-fill"></i>
                    Manajemen Siswa
                </button>

                {/* Kanan */}
                <div className="flex items-center gap-2 text-violet-600 font-medium">
                    <i className="ri-user-3-line"></i>
                    SAP                </div>
            </div>
            <div className="fixed overflow-y-auto top-0 left-0 h-full w-60 bg-gradient-to-b from-indigo-900 via-violet-800 to-indigo-900 text-white shadow-lg flex flex-col">

                {/* LOGO */}
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

                                {/* SUBMENU */}
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

                {/* LOGOUT */}
                <div className="p-3 border-t border-indigo-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 py-2 px-3 rounded-md bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 font-bold transition"
                    >
                        <i className="ri-logout-box-line"></i>
                        Kembali
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;