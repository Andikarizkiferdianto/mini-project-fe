import React from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";

const RiwayatTransaksi = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                <div className="font-semibold text-xl">
                    Riwayat Transaksi Semua Siswa

                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">

                    <div className="bg-violet-500 text-white px-4 py-3 font-semibold">
                        Filter Transaksi
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

                {/* tabel */}
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="w-full max-w-5xl">

                        <div className="text-lg font-semibold mb-4">
                            Riwayat Transaksi Hari Ini
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-violet-600 text-white text-center">
                                    <tr>
                                        <th className="py-2 px-3">No</th>
                                        <th className="py-2 px-3">Tanggal</th>
                                        <th className="py-2 px-3">Kode Transaksi</th>
                                        <th className="py-2 px-3">Jenis Transaksi</th>
                                        <th className="py-2 px-3">Nis</th>
                                        <th className="py-2 px-3">Nama Siswa</th>
                                        <th className="py-2 px-3 text-right">Jumlah</th>
                                        <th className="py-2 px-3">Keterangan</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td
                                            colSpan="8"
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

export default RiwayatTransaksi;