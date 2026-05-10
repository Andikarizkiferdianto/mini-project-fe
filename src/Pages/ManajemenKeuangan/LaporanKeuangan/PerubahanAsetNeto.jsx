import React from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";

const PerubahanAsetNeto = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                <div className="font-semibold text-xl">
                    Laporan Perubahan Aset Neto

                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">

                     <div className="bg-violet-500 text-white px-4 py-3 font-semibold">
                        Filter Periode
                    </div>

                    {/* ISI */}
                    <div className="bg-gray-50 p-4">

                        <div className="flex items-end gap-4">

                            {/* tanggal awal */}
                            <div className="flex-1">
                                <label className="block text-sm mb-1">
                                    Tanggal Awal
                                </label>

                                <input
                                    type="date"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>

                            {/* tanggal akhir */}
                            <div className="flex-1">
                                <label className="block text-sm mb-1">
                                    Tanggal Akhir
                                </label>

                                <input
                                    type="date"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>

                            {/* tombol tampilkan */}
                            <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded">
                                Tampilkan
                            </button>
                        </div>

                        {/* tombol download */}
                        <div className="flex justify-center mt-4">
                            <button className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-2 rounded transition">
                                Download Laporan
                            </button>
                        </div>

                    </div>
                </div>

                {/* tabel */}
                <div className="bg-white   rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Perbandingan Aset Neto
                    </h2>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <div className="min-w-full">
                            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-violet-600 text-white text-center">
                                    <tr>
                                        <th className="px-3 py-2">Komponen</th>
                                        <th className="px-3 py-2">31 May 2025</th>
                                        <th className="px-3 py-2">17 May 2026</th>
                                        <th className="px-3 py-2">Perubahan</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-6 text-gray-500 italic"
                                        >
                                            Belum ada transaksi hari ini
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>
                
            </div>
        </div>
    );
};

export default PerubahanAsetNeto;