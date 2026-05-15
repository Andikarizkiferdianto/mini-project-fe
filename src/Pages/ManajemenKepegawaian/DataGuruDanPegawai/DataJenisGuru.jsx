import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom';

const DataJenisGuru = () => {
    const [activeTab, setActiveTab] = useState('guru');
    const navigate = useNavigate();


    return (
        <div className="flex bg-gray-100 min-h-screen font-sans">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">

                <div className="bg-violet-600 p-3 rounded-t-lg flex flex-col md:flex-row justify-between items-center shadow-md gap-3">
                    <h2 className="text-white font-bold flex items-center gap-2 text-lg">
                        <i className="ri-group-fill"></i> Data Guru
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        <button className="bg-green-600 text-white text-xs px-5 py-3 rounded flex items-center gap-1 hover:bg-green-700 transition font-medium">
                            <i className="ri-file-excel-2-fill"></i> Download Template Excel
                        </button>
                        <button className="bg-cyan-500 text-white text-xs px-5 py-3 rounded flex items-center gap-1 hover:bg-cyan-600 transition font-medium">
                            <i className="ri-upload-2-fill"></i> Upload Excel
                        </button>
                        <button className="bg-white text-black text-xs px-5 py-3 rounded flex items-center gap-1 hover:bg-gray-100 transition font-medium">
                            <i className="ri-add-line"></i> Tambah Guru
                        </button>
                    </div>
                    
                </div>

                <div className="bg-white p-4 shadow rounded-b-lg border border-gray-200">
                    {/* TAB SWITCHER */}
                    <div className="flex w-full mb-6 border border-violet-600 rounded overflow-hidden">
                        <button
                            onClick={() => setActiveTab('guru')}
                            className={`flex-1 py-2 text-sm font-bold flex justify-center items-center gap-2 transition ${activeTab === 'guru' ? 'bg-violet-600 text-white' : 'bg-white text-violet-600'}`}
                        >
                            <i className="ri-user-received-2-fill"></i> Guru
                        </button>
                        <button
                            onClick={() => navigate("/manajemen-kepegawaian/data-pegawai")} // PINDAH KE PAGE PEGAWAI
                            className="flex-1 py-3 text-sm font-bold bg-white text-violet-600 hover:bg-gray-50"
                        >
                            <i className="ri-user-settings-fill mr-2"></i> Pegawai
                        </button>
                    </div>

                    {/* EXPORT & SEARCH */}
                    <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                        <div className="flex flex-wrap gap-1">
                            {['Copy', 'CSV', 'Excel', 'PDF', 'Print'].map((btn) => (
                                <button key={btn} className="border border-gray-300 px-4 py-1 text-sm rounded shadow-sm hover:bg-gray-50 text-gray-700">
                                    {btn}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Search:</label>
                            <input type="text" className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-violet-500 w-48 md:w-64" />
                        </div>
                    </div>

                    {/* TABLE DATA GURU */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-3 w-12">No</th>
                                    <th className="p-3">Nama</th>
                                    <th className="p-3">NIP</th>
                                    <th className="p-3 text-center md:text-left">Jabatan</th>
                                    <th className="p-3">No HP</th>
                                    <th className="p-3">Email </th>
                                    <th className="p-3 text-center">Status</th>
                                    <th className="p-3 text-center">Aksi </th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-600">
                        <p>Showing 1 to 1 entries</p>
                        <div className="flex border border-gray-300 rounded shadow-sm mt-4 md:mt-0 overflow-hidden">
                            <button className="px-3 py-1.5 hover:bg-gray-100 transition border-r border-gray-300">Previous</button>
                            <button className="px-4 py-1.5 bg-gray-100 font-bold border-r border-gray-300">1</button>
                             <button className="px-3 py-1.5 hover:bg-gray-100 transition font-bold">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataJenisGuru;