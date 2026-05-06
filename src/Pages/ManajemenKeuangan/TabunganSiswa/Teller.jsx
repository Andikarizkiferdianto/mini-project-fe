import React from "react";
import Sidebar from "../../../components/Sidebar";

const Teller = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* FORM */}
                    <div className="bg-white p-5 mr-5 rounded-xl shadow space-y-4">
                        <h1 className="text-2xl font-semibold text-violet-600">
                            Transaksi Tabungan & Teller
                        </h1>

                        <div>
                            <label className="text-sm font-medium">Transaksi Tabungan</label>
                            <select className="w-full mt-1 border border-gray-300 rounded-lg p-2">
                                <option>Transaksi Tabungan</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium">NIS</label>
                            <input
                                type="text"
                                placeholder="Masukkan NIS"
                                className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Jenis Transaksi</label>
                            <select className="w-full mt-1 border border-gray-300 rounded-lg p-2">
                                <option>Penyetoran</option>
                                <option>Penarikan</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Nominal</label>
                            <input
                                type="number"
                                placeholder="Masukkan nominal"
                                className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Keterangan</label>
                            <input
                                type="text"
                                placeholder="Keterangan transaksi"
                                className="w-full mt-1 border border-gray-300
                                 rounded-lg p-2"
                            />
                        </div>

                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold">
                            Submit Tabungan
                        </button>
                    </div>

                    {/* KANAN */}
                    <div className="space-y-6 ">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white border-2 border-green-500 rounded-xl p-5 text-center shadow">
                                <p className="text-sm text-gray-500">Total Saldo Tabungan</p>
                                <h2 className="text-2xl font-bold text-green-600">0</h2>
                            </div>

                            <div className="bg-white border-2 border-gray-400 rounded-xl p-5 text-center shadow">
                                <p className="text-sm text-gray-500">Total Penabung</p>
                                <h2 className="text-2xl font-bold text-gray-700">0 Siswa</h2>
                            </div>
                        </div>

                        {/* tabel */}
                        <div className="bg-white rounded-xl shadow">
                            <div className="px-4 py-2 rounded-t-xl font-semibold">
                                Riwayat Transaksi Hari Ini
                            </div>

                            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-violet-600 text-white text-center">
                                    <tr className="text-left">
                                        <th className="p-3">No</th>
                                        <th className="p-3">Nama / Kode</th>
                                        <th className="p-3">Jenis Transaksi</th>
                                        <th className="p-3 text-right">Jumlah</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="4" className="text-center p-4 text-gray-500 italic">
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

export default Teller;