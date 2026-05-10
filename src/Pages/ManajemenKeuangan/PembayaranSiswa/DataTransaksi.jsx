import React from "react";
import Sidebar from "../../../components/Sidebar";

const DataTransaksi = () => {

    const bulanList = [
        "Januari","Februari","Maret","April","Mei","Juni",
        "Juli","Agustus","September","Oktober","November","Desember"
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16">
                <div className="grid grid-cols-4 gap-4">

                    {/* LEFT CONTENT */}
                    <div className="col-span-3">

                        {/* HEADER */}
                        <div className="bg-violet-600 text-white px-4 py-3 rounded-t-lg font-semibold">
                            Transaksi Pembayaran  
                        </div>

                        {/* FILTER */}
                        <div className="bg-white p-4 rounded-lg shadow   space-y-4">

                            <div className="flex items-end gap-4">

                                <div className="flex-1">
                                    <label className="text-sm font-bold block mb-1">Tahun Ajaran</label>
                                    <select className="w-full border border-gray-200 rounded px-3 py-2">
                                        <option>2025/2026</option>
                                        <option>2024/2025</option>
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <label className="text-sm font-bold block mb-1">Bulan</label>
                                    <select className="w-full border border-gray-200 rounded px-3 py-2">
                                        {bulanList.map((b, i) => (
                                            <option key={i}>{b}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded">
                                        Filter
                                    </button>
                                </div>

                            </div>

                            {/* TABLE */}
                            <div className="overflow-x-auto rounded-lg ">
                                <table className="min-w-full border border-gray-200 text-sm">
                                    <thead className="bg-violet-600 text-white">
                                        <tr>
                                            <th className="px-3 py-2">No</th>
                                            <th className="px-3 py-2">Tanggal</th>
                                            <th className="px-3 py-2">Status</th>
                                            <th className="px-3 py-2">NIS</th>
                                            <th className="px-3 py-2">Nama Lengkap</th>
                                            <th className="px-3 py-2">Kelas</th>
                                            <th className="px-3 py-2">Kwitansi</th>
                                            <th className="px-3 py-2">Jenis</th>
                                            <th className="px-3 py-2">Nominal</th>
                                            <th className="px-3 py-2">Keterangan</th>
                                            <th className="px-3 py-2">Petugas</th>
                                            <th className="px-3 py-2">Metode</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan="10" className="text-center py-6 text-gray-500">
                                                Tidak ada data transaksi pada filter ini.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="col-span-1 space-y-4">

                        {/* TRANSAKSI HARI INI */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="bg-cyan-500 text-white px-4 py-2 font-semibold">
                                Transaksi Hari Ini
                            </div>
                            <div className="p-4 text-center">
                                <div className="text-4xl font-bold">0</div>
                                <p className="text-sm mt-2">Jumlah siswa bayar: 0</p>
                                <p className="text-sm">Rata-rata bayar per siswa: 0</p>
                            </div>
                        </div>

                        {/* RINGKASAN BULAN */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="bg-green-600 text-white px-4 py-2 font-semibold">
                                Ringkasan Bulan 5 2026
                            </div>
                            <div className="p-4 space-y-3">
                                <p className="text-sm">Total nominal transaksi bulan ini:</p>
                                <div className="text-xl font-semibold">Rp 0</div>

                                <p className="text-sm mt-2">
                                    Persentase transaksi terbayar bulan ini:
                                </p>
                                <div className="w-full bg-gray-200 h-3 rounded"></div>

                                <p className="text-sm mt-2">Total transaksi bulan ini: 0</p>
                                <p className="text-sm">Transaksi terbayar: 0</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default DataTransaksi;