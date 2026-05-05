import React from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";

const RekapPerTanggal = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">

                    {/* header */}
                    <div className="bg-violet-500 text-white px-4 py-3 font-semibold">
                        Rekap Per Tanggal
                    </div>

                    {/* isi */}
                    <div className="p-4 space-y-4">

                        {/* input */}
                        <div className="grid grid-cols-3 gap-4">

                            <div>
                                <label className="block text-sm mb-1">Tanggal Awal</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Tanggal Akhir</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Petugas</label>
                                <select className="w-full border border-gray-200 rounded px-3 py-2">
                                    <option>-- Semua Petugas --</option>
                                </select>
                            </div>

                        </div>

                        {/* tombol */}
                        <div className="flex justify-end">
                            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                                PILIH
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default RekapPerTanggal;