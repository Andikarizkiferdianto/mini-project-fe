import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';

const RiwayatAset = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">
                    <div className="bg-violet-600 p-3 rounded-t-lg flex justify-between items-center shadow-md">
                        <h2 className="text-white font-semibold flex items-center gap-2">
                            <i className="ri-history-fill text-2xl"></i> Riwayat Aktivitas Aset
                        </h2>
                    <button className="bg-white text-black text-sm px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-100 transition">
                        <i className="ri-add-line"></i> Tambah Aktivitas
                    </button>
                </div>

                <div className="bg-white p-6 shadow rounded-b-lg border border-gray-200">
                   

                    {/* TABEL */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-3 w-10">No</th>
                                    <th className="p-3">Nama Aset</th>
                                    <th className="p-3">Aktivitas</th>
                                    <th className="p-3">Keterangan</th>
                                    <th className="p-3">Pengguna</th>
                                    <th className="p-3">Tanggal</th>
                                    <th className="p-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800">

                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default RiwayatAset;