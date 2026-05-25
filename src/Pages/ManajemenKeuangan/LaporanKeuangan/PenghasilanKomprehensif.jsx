import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";

const PenghasilanKomprehensif = () => {
    const [filter, setFilter] = useState({ start: "", end: "" });
    const [report, setReport] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/laporan/penghasilan-komprehensif`, { params: filter });
            setReport(res.data.data);
        } catch (err) {
            alert("Gagal mengambil data: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6 mt-16 space-y-6">
                <div className="font-semibold text-xl">Laporan Penghasilan Komprehensif</div>

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <div className="bg-violet-500 text-white px-4 py-3 font-semibold">Filter Periode</div>
                    <div className="bg-gray-50 p-4">
                        <div className="flex items-end gap-4">
                            <div className="flex-1">
                                <label className="block text-sm mb-1">Tanggal Awal</label>
                                <input type="date" className="w-full border border-gray-300 rounded px-3 py-2" onChange={(e) => setFilter({...filter, start: e.target.value})} />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm mb-1">Tanggal Akhir</label>
                                <input type="date" className="w-full border border-gray-300 rounded px-3 py-2" onChange={(e) => setFilter({...filter, end: e.target.value})} />
                            </div>
                            <button onClick={fetchData} className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded">Tampilkan</button>
                        </div>
                    </div>
                </div>

                {/* Tabel Pendapatan */}
                <div className="overflow-x-auto">
                    <div className="bg-white mt-5 rounded-lg shadow p-4">
                        <h2 className="text-lg font-semibold mb-2">Pendapatan</h2>
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="px-3 py-2">Nama Akun</th>
                                    <th className="px-3 py-2">DENGAN PEMBATASAN</th>
                                    <th className="px-3 py-2">TANPA PEMBATASAN</th>
                                    <th className="px-3 py-2">JUMLAH</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report?.pendapatan.length > 0 ? report.pendapatan.map((item, i) => (
                                    <tr key={i} className="text-center border-b">
                                        <td className="px-3 py-2">{item.nama_akun}</td>
                                        <td className="px-3 py-2">{item.dengan_pembatasan.toLocaleString()}</td>
                                        <td className="px-3 py-2">{item.tanpa_pembatasan.toLocaleString()}</td>
                                        <td className="px-3 py-2 font-bold">{item.jumlah.toLocaleString()}</td>
                                    </tr>
                                )) : <tr><td colSpan="4" className="text-center py-6 text-gray-500 italic">Belum ada data pendapatan</td></tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* Tabel Beban */}
                    <div className="bg-white mt-5 rounded-lg shadow p-4">
                        <h2 className="text-lg font-semibold mb-2">Beban</h2>
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="px-3 py-2">Nama Akun</th>
                                    <th className="px-3 py-2">DENGAN PEMBATASAN</th>
                                    <th className="px-3 py-2">TANPA PEMBATASAN</th>
                                    <th className="px-3 py-2">JUMLAH</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report?.beban.length > 0 ? report.beban.map((item, i) => (
                                    <tr key={i} className="text-center border-b">
                                        <td className="px-3 py-2">{item.nama_akun}</td>
                                        <td className="px-3 py-2">{item.dengan_pembatasan.toLocaleString()}</td>
                                        <td className="px-3 py-2">{item.tanpa_pembatasan.toLocaleString()}</td>
                                        <td className="px-3 py-2 font-bold">{item.jumlah.toLocaleString()}</td>
                                    </tr>
                                )) : <tr><td colSpan="4" className="text-center py-6 text-gray-500 italic">Belum ada data beban</td></tr>}
                            </tbody>
                        </table>
                        {report && (
                            <div className="mt-4 p-3 bg-gray-100 font-bold text-right">
                                Laba/Rugi Bersih: Rp {report.laba_rugi_bersih.toLocaleString()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PenghasilanKomprehensif;