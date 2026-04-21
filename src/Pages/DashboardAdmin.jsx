import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, GraduationCap, Wallet, BookOpen,
  Layout, FileText, School, Contact2, LogOut
} from 'lucide-react';
import LogoSap from '../assets/LogoSap.png';
import Swal from "sweetalert2";
const DashboardAdmin = () => {
  const navigate = useNavigate();
  const nav = useNavigate();
  const menus = [
    { title: "Manajemen Siswa", icon: <Users size={40} />, path: "/manajemen-siswa/dashboard" },
    { title: "Manajemen Guru", icon: <GraduationCap size={40} /> },
    { title: "Keuangan", icon: <Wallet size={40} /> },
    { title: "Perpustakaan", icon: <BookOpen size={40} /> },
    { title: "Aplikasi", icon: <Layout size={40} /> },
    { title: "PPDB", icon: <FileText size={40} /> },
    { title: "Manajemen Sekolah", icon: <School size={40} /> },
    { title: "Kepegawaian", icon: <Contact2 size={40} /> },
  ];

  const handleLogout = (e) => {
    e?.preventDefault();

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

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <div className="bg-gradient-to-r from-violet-700 to-indigo-800 shadow-lg px-8 py-4 flex justify-between items-center text-white relative z-10">

        <div className="flex items-center gap-4">
          <div className="bg-white p-2.5 rounded-2xl shadow-inner border border-white/10">
            <img src={LogoSap} alt="logo" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight leading-tight">SAP</h1>
            <p className="text-[10px] font-medium opacity-80 mt-0.5 uppercase tracking-widest">Sistem Akademik Pintar</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <motion.div
            className="bg-white/10 p-2 rounded-2xl border border-white/20 shadow-xl cursor-pointer"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <img
              src={LogoSap}
              alt="Profile Logo"
              className="w-10 h-10 object-contain invert brightness-0"
            />
          </motion.div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {menus.map((menu, index) => (
            <motion.div
              key={index}
              onClick={() => menu.path && navigate(menu.path)}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200/60 hover:shadow-2xl hover:shadow-violet-200 transition-all duration-500 flex flex-col items-center justify-center gap-5 cursor-pointer group"
              whileHover={{ y: -10 }}
            >
              <div className="text-violet-600 group-hover:scale-110 transition-transform duration-300">
                {menu.icon}
              </div>
              <span className="font-bold text-slate-700 text-center tracking-tight group-hover:text-violet-700 transition-colors">
                {menu.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="bg-slate-900 text-white flex justify-between items-center px-10 py-4 text-[11px] font-medium tracking-wide border-t border-white/5 relative z-10">
        <div className="hidden md:block w-32"></div>
        <div className="absolute left-1/2 -translate-x-1/2 opacity-60 italic text-center">
          © 2026 SAP Sistem Akademik Pintar. All rights reserved.
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-500/20 uppercase font-bold text-[10px]"
        >
          <LogOut size={14} /> Keluar
        </button>
      </footer>
    </div>
  );
};

export default DashboardAdmin;