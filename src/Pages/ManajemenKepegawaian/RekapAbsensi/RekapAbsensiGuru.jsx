import React from 'react';
import Sidebar from '../../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';

const RekapAbsensiGuru = () => {
   

    return (
        <div className="flex bg-[#f4f7f6] min-h-screen font-sans text-gray-700">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">


                <div className="flex-1 overflow-y-auto p-8 pt-6 mt-12">
                    <h1 className="mt-5 text-lg font-semibold mb-6 flex items-center gap-3 text-gray-800">
                        <i className="ri-user-settings-line text-violet-500 text-3xl"></i> Absensi Harian Pegawai
                    </h1>

                    {/* Section Filter */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
                            <i className="ri-filter-3-line text-violet-500 text-xl"></i>
                            <span className="text-lg font-semibold">Filter</span>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
                            <div className="space-y-2">
                                <label className="text-sm font-medium block">Jenis Pegawai</label>
                                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-gray-100 outline-none appearance-none bg-white">
                                    <option>-- Semua Jenis --</option>
                                    <option>Guru</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium block">Tanggal Awal</label>
                                <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base outline-none focus:ring-2 focus:ring-gray-100" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium block">Tanggal Akhir</label>
                                <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base outline-none focus:ring-2 focus:ring-gray-100" />
                            </div>
                            <button className="bg-violet-600 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-violet-700 transition flex items-center justify-center gap-2 shadow-md">
                                <i className="ri-filter-fill"></i> Filter
                            </button>
                        </div>
                    </div>

                    {/* Section Data Absensi */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
                            <i className="ri-list-check text-green-600 text-xl"></i>
                            <span className="text-lg font-semibold">Data Absensi</span>
                        </div>

                        {/* tabel 1 */}
                        <div className="overflow-x-auto px-4 pb-4">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                    <tr>
                                        <th className="p-3 w-14">No</th>
                                        <th className="p-3">Tanggal</th>
                                        <th className="p-3">NIP</th>
                                        <th className="p-3">Nama</th>
                                        <th className="p-3">Jenis Pegawai</th>
                                        <th className="p-3">Jam Masuk</th>
                                        <th className="p-3">Status Masuk</th>
                                        <th className="p-3">Jam Pulang</th>
                                        <th className="p-3">Status Pulang</th>
                                        <th className="p-3">Keterangan</th>
                                        <th className="p-3">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Section Rekap Absensi */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
                            <i className="ri-file-list-3-line text-violet-500 text-xl"></i>
                            <span className="text-lg font-semibold">Rekap Absensi Pegawai</span>
                        </div>
                        {/* tabel 2 */}
                        <div className="overflow-x-auto px-4 pb-4">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                    <tr className="text-center">
                                        <th className="p-3 w-14">No</th>
                                        <th className="p-3">NIP</th>
                                        <th className="p-3">Nama</th>
                                        <th className="p-3">Jenis Pegawai</th>
                                        <th className="p-3">Total Hari</th>
                                        <th className="p-3">Hadir</th>
                                        <th className="p-3">Izin</th>
                                        <th className="p-3">Sakit</th>
                                        <th className="p-3">Alfa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RekapAbsensiGuru;