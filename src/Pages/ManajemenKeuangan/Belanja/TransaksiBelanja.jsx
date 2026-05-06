import React from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";

const TransaksiBelanja = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                {/* Title */}
                <h1 className="text-3xl font-semibold">
                    Transaksi Belanja
                </h1>

                {/* FORM */}
                <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Form Tambah Transaksi Belanja
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        {/* Kiri */}
                        <div className="space-y-4">

                            <div>
                                <label className="text-sm">Jenis Belanja</label>
                                <select className="w-full mt-2 border border-gray-200 rounded px-3 py-3 text-sm">
                                    <option>-- Pilih Jenis Belanja --</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm">Bidang / Divisi</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">Penerima</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">Sumber</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-3 text-sm"
                                />
                            </div>

                        </div>

                        {/* Kanan */}
                        <div className="space-y-4">

                            <div>
                                <label className="block text-sm mb-1">Tanggal Belanja</label>
                                <input
                                    type="date"
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="text-sm">Nominal</label>
                                <input
                                    type="number"
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">Menyetujui</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">Keterangan</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-6 text-sm"
                                />
                            </div>

                            <div className="flex justify-end mt-4">
                                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
                                    Submit
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="bg-white   rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Daftar Transaksi Belanja
                    </h2>

                    <div className="flex justify-between items-center mb-3">
                        <div className="flex gap-2">
                            <button className="border px-3 py-1 text-xs rounded">Copy</button>
                            <button className="border px-3 py-1 text-xs rounded">CSV</button>
                            <button className="border px-3 py-1 text-xs rounded">Excel</button>
                            <button className="border px-3 py-1 text-xs rounded">PDF</button>
                            <button className="border px-3 py-1 text-xs rounded">Print</button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm">Search:</span>
                            <div className="flex items-center border rounded px-2">
                                <input
                                    type="text"
                                    className="outline-none px-2 py-1 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <div className="min-w-full">
                            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-violet-600 text-white text-center">
                                    <tr>
                                        <th className="px-3 py-2">No</th>
                                        <th className="px-3 py-2">Kode Transaksi</th>
                                        <th className="px-3 py-2">Jenis Belanja</th>
                                        <th className="px-3 py-2">Bidang</th>
                                        <th className="px-3 py-2">Penerima</th>
                                        <th className="px-3 py-2">Sumber</th>
                                        <th className="px-3 py-2">Tanggal</th>
                                        <th className="px-3 py-2">Menyetujui</th>
                                        <th className="px-3 py-2">Keterangan</th>
                                        <th className="px-3 py-2">Nominal</th>
                                        <th className="px-3 py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-3 py-2 space-x-1"></td>
                                        <td className="px-3 py-2 space-x-1"></td>
                                        <td className="px-3 py-2 space-x-1"></td>
                                        <td className="px-3 py-2 space-x-1"></td>
                                        <td className="px-3 py-2 space-x-1"></td>
                                        <td className="px-3 py-2 space-x-1"></td>
                                        <td className="px-3 py-2 space-x-1"></td>
                                        <td className="px-3 py-2 space-x-1"></td>
                                        <td className="px-3 py-2 space-x-1"></td>
                                        <td className="px-3 py-2 space-x-1"></td>
                                        <td className="px-3 py-2 space-x-1"></td>
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

export default TransaksiBelanja; 