import React from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";


const BayarTagihan = () => {
    return (
        <div className="bg-white rounded shadow border">

            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />

                <div className="flex-1 p-6 mt-16 space-y-6">

                     <div className="bg-violet-500 text-white px-4 py-3 font-semibold rounded-t">
                        Filter Data Pembayaran Siswa
                    </div>

                     <div className="p-4 space-y-4">

                         <div className="grid grid-cols-2 gap-4">

                            {/* TAHUN AJARAN */}
                            <div>
                                <label className="block text-sm mb-1">
                                    Tahun Ajaran
                                </label>
                                <select className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                                    <option>Pilih Tahun Ajaran</option>
                                    {/* nanti isi dari backend */}
                                </select>
                            </div>

                            {/* CARI SISWA */}
                            <div>
                                <label className="block text-sm mb-1">
                                    Cari Siswa (NIS atau Nama)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Masukkan NIS atau Nama Siswa"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                />
                            </div>

                        </div>

                        {/* BUTTON */}
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded flex items-center justify-center gap-2">
                            <Search size={16} />
                            Cari Siswa
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BayarTagihan;