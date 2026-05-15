import React from 'react';
import Sidebar from '../../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';

const Cuti = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-4 mt-12">
                <div className="bg-white border border-gray-100 rounded shadow-sm mt-5">

                    {/* HEADER */}
                    <div className="flex bg-violet-600 justify-between items-center p-4 rounded-t-md">
                        <h1 className="text-lg text-white font-medium ">
                            Manajemen Cuti
                        </h1>

                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 font-medium">
                            <i className="ri-add-line"></i>
                            Ajukan Cuti
                        </button>
                    </div>

                    {/* FILTER */}
                    <div className="p-4 flex gap-3">
                        <select className="border border-gray-300 rounded px-3 py-2 w-56">
                            <option>-- Filter Pegawai --</option>
                        </select>

                        <select className="border border-gray-300 rounded px-3 py-2 w-40">
                            <option>-- Filter Status --</option>
                        </select>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto px-4 pb-4">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr >
                                    <th className="p-3 w-14">No</th>
                                    <th className="p-3 text-left">Nama Pegawai</th>
                                    <th className="p-3">Tanggal Mulai</th>
                                    <th className="p-3">anggal Selesai</th>
                                    <th className="p-3 text-left">Alasan</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="bg-white hover:bg-gray-50">
                                     
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cuti;