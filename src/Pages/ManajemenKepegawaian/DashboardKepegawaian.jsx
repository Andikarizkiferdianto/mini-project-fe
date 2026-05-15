import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';

const DashboardKepegawaian = () => {
    const [stats] = useState({
        totalGuru: 0,
        totalPegawai: 0,
        guruBelumInput: 0,
        pegawaiBelumInput: 0
    });

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">
                <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Manajemen Kepegawaian</h1>

                {/* STATS CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Total Guru */}
                    <div className="bg-blue-600 p-6 rounded-xl shadow-lg flex items-center gap-4 text-white">
                        <i className="ri-presentation-fill text-5xl opacity-80"></i>
                        <div>
                            <p className="text-sm font-medium opacity-90">Total Guru</p>
                            <h3 className="text-3xl font-bold">{stats.totalGuru}</h3>
                        </div>
                    </div>

                    {/* Total Pegawai */}
                    <div className="bg-emerald-600 p-6 rounded-xl shadow-lg flex items-center gap-4 text-white">
                        <i className="ri-user-settings-fill text-5xl opacity-80"></i>
                        <div>
                            <p className="text-sm font-medium opacity-90">Total Pegawai</p>
                            <h3 className="text-3xl font-bold">{stats.totalPegawai}</h3>
                        </div>
                    </div>

                    {/* Guru Belum Input */}
                    <div className="bg-amber-400 p-6 rounded-xl shadow-lg flex items-center gap-4 text-white">
                        <i className="ri-error-warning-fill text-5xl opacity-80"></i>
                        <div>
                            <p className="text-sm font-medium opacity-90 leading-tight">Guru Belum Input Kinerja</p>
                            <h3 className="text-3xl font-bold">{stats.guruBelumInput}</h3>
                        </div>
                    </div>

                    {/* Pegawai Belum Input */}
                    <div className="bg-rose-500 p-6 rounded-xl shadow-lg flex items-center gap-4 text-white">
                        <i className="ri-alert-fill text-5xl opacity-80"></i>
                        <div>
                            <p className="text-sm font-medium opacity-90 leading-tight">Pegawai Belum Input Kinerja</p>
                            <h3 className="text-3xl font-bold">{stats.pegawaiBelumInput}</h3>
                        </div>
                    </div>
                </div>

                {/* RATA-RATA NILAI SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-h-[100px] flex items-center">
                        <h4 className="font-bold text-slate-800">Rata-rata Nilai Indikator Guru</h4>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-h-[100px] flex items-center">
                        <h4 className="font-bold text-slate-800">Rata-rata Nilai Indikator Pegawai</h4>
                    </div>
                </div>

                {/* TOP 3 KINERJA SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="font-bold text-slate-800 mb-4">Top 3 Guru Berdasarkan Kinerja Bulan Ini</h4>
                        <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center text-gray-500 text-sm">
                            Tidak ada data
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="font-bold text-slate-800 mb-4">Top 3 Pegawai Berdasarkan Kinerja Bulan Ini</h4>
                        <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center text-gray-500 text-sm">
                            Tidak ada data
                        </div>
                    </div>
                </div>

                {/* ALERT MESSAGES */}
                <div className="space-y-4">
                    <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded shadow-sm flex items-center gap-3">
                        <i className="ri-error-warning-fill text-orange-600 text-xl"></i>
                        <p className="text-sm text-orange-800">
                            <span className="font-bold text-orange-900 italic">Perhatian:</span> Pastikan semua guru dan pegawai mengisi nilai kinerja bulanan tepat waktu.
                        </p>
                    </div>

                    <div className="bg-sky-50 border-l-4 border-sky-400 p-4 rounded shadow-sm flex items-center gap-3">
                        <i className="ri-information-fill text-sky-600 text-xl"></i>
                        <p className="text-sm text-sky-800">
                            <span className="font-medium text-sky-900">Info:</span> Sistem ini mengupdate data kinerja secara real-time setiap bulan.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardKepegawaian;