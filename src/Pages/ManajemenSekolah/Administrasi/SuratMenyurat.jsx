import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';

const SuratMenyurat = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">
                 <div className="bg-violet-600 p-3 rounded-t-lg flex justify-between items-center shadow-md">
                    <h2 className="text-white font-semibold flex items-center gap-2">
                        <i className="ri-mail-fill text-2xl"></i>  Surat Menyurat
                    </h2>
                    <button className="bg-white text-black text-sm px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-100 transition">
                        <i className="ri-add-line"></i> Tambah Surat
                    </button>
                </div>

                <div className="bg-white p-6 shadow rounded-b-lg border border-gray-200">
                     <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                        <div className="flex flex-wrap gap-1">
                            {['Copy', 'CSV', 'Excel', 'PDF', 'Print'].map((btn) => (
                                <button key={btn} className="border border-gray-300 px-4 py-1.5 text-sm rounded shadow-sm hover:bg-gray-50 text-gray-700 font-medium">
                                    {btn}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Search:</label>
                            <input type="text" className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-500 shadow-sm" />
                        </div>
                    </div>

                    {/* TABEL */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-3 w-10">No</th>
                                    <th className="p-3">No. Surat</th>
                                    <th className="p-3">Judul</th>
                                    <th className="p-3">Tanggal</th>
                                    <th className="p-3 text-center">Jenis</th>
                                    <th className="p-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800">

                            </tbody>
                        </table>
                    </div>

                     <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-600">
                        <p>Showing 1 to 1 entries</p>
                        <div className="flex border border-gray-300 rounded shadow-sm overflow-hidden mt-4 md:mt-0">
                            <button className="px-4 py-2 hover:bg-gray-100 transition">Previous</button>
                            <button className="px-4 py-2 bg-gray-600 text-white font-bold">1</button>
                             <button className="px-4 py-2 border-l border-gray-300 hover:bg-gray-100 transition">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuratMenyurat;