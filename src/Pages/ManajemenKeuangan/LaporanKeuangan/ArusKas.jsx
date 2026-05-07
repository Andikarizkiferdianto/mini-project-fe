import React from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";

const ArusKas = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                <div className="font-semibold text-xl">
                    Laporan Arus Kas

                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">

                    <div className="bg-violet-500 text-white px-4 py-3 font-semibold">
                        Filter Periode
                    </div>

                    {/* isi */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-end gap-4">

                            <div className="flex-1">
                                <label className="block text-sm mb-3">Tanggal Awal</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm mb-3">Tanggal Akhir</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                />
                            </div>


                            <button className="bg-green-600 hover:bg-green-700 text-white px-20 py-2 rounded flex items-center gap-2">
                                Tampilkan
                            </button>

 <div className="mt-4">
            <button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-2 rounded transition">
                Download Laporan
            </button>
        </div>

                        </div>
                    </div>

                </div>

                {/* tabel 1 */}
                <div className="overflow-x-auto">
                    <div className="bg-violet-600 text-white px-4 py-3 rounded-t-lg font-semibold">
                        Ringkasan Arus Kas
                    </div>
                    <div className="bg-white shadow p-4">

                        <h2 className="text-lg mt-4 font-semibold mb-2">
                            Operasi
                        </h2>

                        {/* tabel 1*/}
                        <div className="overflow-x-auto">
                            <div className="min-w-full">
                                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                                    <thead className="bg-violet-600 text-white">
                                        <tr>
                                            <th className="px-3 py-3 text-left">Nama Akun</th>
                                            <th className="px-5 py-3 text-right">Nominal</th>

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


                        <h2 className="text-lg mt-4 font-semibold mb-2">
                            Investasi
                        </h2>

                        {/* tabel 2 */}
                        <div className="overflow-x-auto">
                            <div className="min-w-full">
                                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                                    <thead className="bg-violet-600 text-white">
                                        <tr>
                                            <th className="px-3 py-3 text-left">Nama Akun</th>
                                            <th className="px-5 py-3 text-right">Nominal</th>

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

                        <h2 className="text-lg mt-4 font-semibold mb-2">
                            Pendanaan
                        </h2>

                        {/* tabel 3 */}
                        <div className="overflow-x-auto">
                            <div className="min-w-full">
                                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                                    <thead className="bg-violet-600 text-white">
                                        <tr>
                                            <th className="px-3 py-3 text-left">Nama Akun</th>
                                            <th className="px-5 py-3 text-right">Nominal</th>

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
        </div>
    );
};

export default ArusKas;