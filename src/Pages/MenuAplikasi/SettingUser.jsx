import React from "react";
import Sidebar from "../../components/Sidebar";

const SettingUser = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                 <h1 className="text-3xl text-gray-800">
                    Manajemen User
                </h1>

                 <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">

                     <div className="bg-violet-600 text-white px-4 py-3 text-lg">
                        Filter Data User (Tahun Ajaran Aktif:
                        <span className="font-bold"> 2025/2026</span>)
                    </div>

                     <div className="p-4">

                        <label className="block text-lg mb-3 text-gray-800">
                            Pilih Jenis User
                        </label>

                        <div className="flex items-center gap-4">

                            {/* SELECT */}
                            <select
                                className="w-60 border border-gray-300 rounded px-4 py-2.5 focus:outline-none"
                            >
                                <option>
                                    -- Pilih Jenis User --
                                </option>
                            </select>

                             <button
                                className="bg-violet-600 hover:bg-violet-700 text-white px-16 py-2.5 rounded"
                            >
                                Tampilkan Data
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SettingUser;