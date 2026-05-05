import React from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";

const TunggakanSiswa = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                 <h1 className="text-lg font-semibold">
                    Tunggakan Siswa <span className="font-bold">Semua Kelas</span>
                </h1>

                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-end gap-4">

                        {/* kelas */}
                        <div className="flex-1">
                            <label className="block text-sm mb-1">
                                Kelas
                            </label>
                            <select className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                <option>Semua Kelas</option>
                            </select>
                        </div>

                        {/* tahun */}
                        <div className="flex-1">
                            <label className="block text-sm mb-1">
                                Tahun Ajaran
                            </label>
                            <select className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                <option>Pilih Tahun</option>
                            </select>
                        </div>

                         <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded flex items-center gap-2">
                            <Search size={16} />
                            Tampilkan
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default TunggakanSiswa;