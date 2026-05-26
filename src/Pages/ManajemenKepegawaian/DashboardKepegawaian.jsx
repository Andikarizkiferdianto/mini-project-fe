import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';

const DashboardKepegawaian = () => {
    // Menggunakan state agar data dari API bisa masuk ke sini
    const [stats, setStats] = useState({
        total_guru: 0,
        total_pegawai: 0,
        guru_belum_input: 0,
        pegawai_belum_input: 0
    });

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/dashboard-kepegawaian");
            setStats(res.data.data.summary);
        } catch (err) {
            console.error("Gagal memuat data", err);
        }
    };

    useEffect(() => { fetchData(); }, []);

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">
                <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Manajemen Kepegawaian</h1>

                {/* STATS CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-blue-600 p-6 rounded-xl shadow-lg flex items-center gap-4 text-white">
                        <i className="ri-presentation-fill text-5xl opacity-80"></i>
                        <div>
                            <p className="text-sm font-medium opacity-90">Total Guru</p>
                            <h3 className="text-3xl font-bold">{stats.total_guru}</h3>
                        </div>
                    </div>

                    <div className="bg-emerald-600 p-6 rounded-xl shadow-lg flex items-center gap-4 text-white">
                        <i className="ri-user-settings-fill text-5xl opacity-80"></i>
                        <div>
                            <p className="text-sm font-medium opacity-90">Total Pegawai</p>
                            <h3 className="text-3xl font-bold">{stats.total_pegawai}</h3>
                        </div>
                    </div>

                    <div className="bg-amber-400 p-6 rounded-xl shadow-lg flex items-center gap-4 text-white">
                        <i className="ri-error-warning-fill text-5xl opacity-80"></i>
                        <div>
                            <p className="text-sm font-medium opacity-90 leading-tight">Guru Belum Input Kinerja</p>
                            <h3 className="text-3xl font-bold">{stats.guru_belum_input}</h3>
                        </div>
                    </div>

                    <div className="bg-rose-500 p-6 rounded-xl shadow-lg flex items-center gap-4 text-white">
                        <i className="ri-alert-fill text-5xl opacity-80"></i>
                        <div>
                            <p className="text-sm font-medium opacity-90 leading-tight">Pegawai Belum Input Kinerja</p>
                            <h3 className="text-3xl font-bold">{stats.pegawai_belum_input}</h3>
                        </div>
                    </div>
                </div>

                {/* Sisanya tetap sama persis sesuai kode Anda sebelumnya */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-h-[100px] flex items-center">
                        <h4 className="font-bold text-slate-800">Rata-rata Nilai Indikator Guru</h4>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-h-[100px] flex items-center">
                        <h4 className="font-bold text-slate-800">Rata-rata Nilai Indikator Pegawai</h4>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="font-bold text-slate-800 mb-4">Top 3 Guru Berdasarkan Kinerja Bulan Ini</h4>
                        <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center text-gray-500 text-sm">Tidak ada data</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="font-bold text-slate-800 mb-4">Top 3 Pegawai Berdasarkan Kinerja Bulan Ini</h4>
                        <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center text-gray-500 text-sm">Tidak ada data</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardKepegawaian;