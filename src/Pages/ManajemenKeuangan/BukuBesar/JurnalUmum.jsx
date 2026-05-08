import React from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";

const JurnalUmum = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                <div className="font-semibold text-xl">
                    Jurnal Umum

                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">

                    <div className="bg-violet-500 text-white px-4 py-3 font-semibold">
                        Jurnal Umum
                    </div>

                    {/* isi */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-end gap-4">

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


                            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded flex items-center gap-2">
                                Tampilkan
                            </button>

                        </div>
                    </div>

                </div>

                {/* tabel */}
                <div className="overflow-x-auto">
                    <div className="overflow-hidden bg-white rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="py-2 px-3">No</th>
                                    <th className="py-2 px-3">Tanggal</th>
                                    <th className="py-2 px-3">Kode Transaksi</th>
                                    <th className="py-2 px-3">Kode Akun</th>
                                    <th className="py-2 px-3">Nama Akun</th>
                                    <th className="py-2 px-3 text-right">Debit (Rp)</th>
                                    <th className="py-2 px-3 text-right">Kredit (Rp)</th>
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
    );
};

export default JurnalUmum;