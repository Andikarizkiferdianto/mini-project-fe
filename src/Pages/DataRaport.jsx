import { useState } from "react";
import Sidebar from "../components/Sidebar";

const DataRaport = () => {
    const [filter, setFilter] = useState({
        kelas: "",
        tahunAjaran: "",
        semester: "",
        waliKelas: "",
        mapel: ""
    });

    const handleChange = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6 bg-gray-100 min-h-screen pt-20">
                
                {/* Header */}
                <div className="bg-violet-600 text-white px-4 py-3 rounded-t-md font-semibold">
                    🔎 Filter Data Raport
                </div>

                {/* Card */}
                <div className="bg-white p-6 rounded-b-md shadow">
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        
                        {/* Kelas */}
                        <div>
                            <label className="block mb-1 text-sm">Kelas</label>
                            <select
                                name="kelas"
                                value={filter.kelas}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">-- Pilih Kelas --</option>
                            </select>
                        </div>

                        {/* Tahun Ajaran */}
                        <div>
                            <label className="block mb-1 text-sm">Tahun Ajaran</label>
                            <select
                                name="tahunAjaran"
                                value={filter.tahunAjaran}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">-- Pilih Tahun --</option>
                            </select>
                        </div>

                        {/* Semester */}
                        <div>
                            <label className="block mb-1 text-sm">Semester</label>
                            <select
                                name="semester"
                                value={filter.semester}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">-- Pilih Semester --</option>
                            </select>
                        </div>

                        {/* Wali Kelas */}
                        <div>
                            <label className="block mb-1 text-sm">Wali Kelas</label>
                            <select
                                name="waliKelas"
                                value={filter.waliKelas}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">-- Semua Wali Kelas --</option>
                            </select>
                        </div>
                    </div>

                    {/* Mata Pelajaran */}
                    <div className="mt-4">
                        <label className="block mb-1 text-sm">Filter Mata Pelajaran</label>
                        <select
                            name="mapel"
                            value={filter.mapel}
                            onChange={handleChange}
                            className="w-full md:w-1/4 border rounded px-3 py-2"
                        >
                            <option value="">-- Semua Mata Pelajaran --</option>
                        </select>
                    </div>

                    {/* Tombol (optional biar realistis) */}
                    <div className="mt-6">
                        <button className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700">
                            Tampilkan Data
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DataRaport;