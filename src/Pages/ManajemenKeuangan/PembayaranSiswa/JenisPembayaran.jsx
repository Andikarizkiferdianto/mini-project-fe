import React from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";

const JenisPembayaran = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                {/* Title */}
                <h1 className="text-xl font-semibold">
                    Jenis Pembayaran
                </h1>

                {/* FORM */}
                <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
                    <h2 className="text-sm font-semibold mb-4">
                        Form Tambah Jenis Pembayaran
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        {/* Kiri */}
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm">Kode Akun Pembayaran</label>
                                <input
                                    type="text"
                                    placeholder="Masukkan kode akun pembayaran"
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">Nama Akun Pembayaran</label>
                                <input
                                    type="text"
                                    placeholder="Masukkan nama akun pembayaran"
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">Tipe</label>
                                <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm">
                                    <option>Bebas</option>
                                    <option>Bulanan</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm">Status</label>
                                <select className="w-full border border-gray-200 rounded px-3 py-2 text-sm">
                                    <option>Pilih Status</option>
                                    <option>Aktif</option>
                                    <option>Non-Aktif</option>
                                </select>
                            </div>

                            <button className="bg-green-600 text-white px-4 py-2 rounded text-sm">
                                Submit
                            </button>
                        </div>

                        {/* Kanan */}
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm">Akun Harta</label>
                                <input
                                    type="text"
                                    placeholder="Pilih Akun Harta"
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">Akun Pendapatan</label>
                                <input
                                    type="text"
                                    placeholder="Pilih Akun Pendapatan"
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">Akun Hutang</label>
                                <input
                                    type="text"
                                    placeholder="Pilih Akun Hutang"
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white   rounded-lg shadow p-4">
                    <h2 className="text-sm font-semibold mb-4">
                        Data Jenis Pembayaran
                    </h2>

                    {/* Top Bar */}
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
                                <Search size={16} />
                                <input
                                    type="text"
                                    className="outline-none px-2 py-1 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                       <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="px-3 py-2">No</th>
                                    <th className="px-3 py-2">Nama Pembayaran</th>
                                    <th className="px-3 py-2">Akun Harta</th>
                                    <th className="px-3 py-2">Akun Pendapatan</th>
                                    <th className="px-3 py-2">Akun Hutang</th>
                                    <th className="px-3 py-2">Tipe</th>
                                    <th className="px-3 py-2">Status</th>
                                    <th className="px-3 py-2">Action</th>
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
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default JenisPembayaran; 