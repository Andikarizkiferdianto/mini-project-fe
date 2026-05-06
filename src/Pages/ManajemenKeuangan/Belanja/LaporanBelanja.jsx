import React from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";

const LaporanBelanja = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">

                    <div className="bg-violet-500 text-white text-xl px-4 py-3 font-semibold">
                        Laporan Belanja
                    </div>

                    {/* isi */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-end gap-4">

                            <div className="flex-1">
                                <label className="block text-sm mb-1">Tanggal Awal</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm mb-1">Tanggal Akhir</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                />
                            </div>


                            <button className="bg-violet-600 hover:bg-violet-700 text-white px-20 py-2 rounded flex items-center gap-2">
                                Filter
                            </button>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default LaporanBelanja;