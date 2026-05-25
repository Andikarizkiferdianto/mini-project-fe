import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";

const PerubahanAsetNeto = () => {
    const [tglAkhir, setTglAkhir] = useState("");
    const [report, setReport] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/laporan/perubahan-aset-neto?end=${tglAkhir}`);
            setReport(res.data.data);
        } catch (err) {
            alert("Gagal memuat data: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6 mt-16 space-y-6">
                <div className="font-semibold text-xl">Laporan Perubahan Aset Neto</div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <div className="bg-violet-500 text-white px-4 py-3 font-semibold">Filter Periode</div>
                    <div className="bg-gray-50 p-4">
                        <div className="flex items-end gap-4">
                            <div className="flex-1">
                                <label className="block text-sm mb-1">Tanggal Akhir</label>
                                <input 
                                    type="date" 
                                    className="w-full border border-gray-300 rounded px-3 py-2" 
                                    onChange={(e) => setTglAkhir(e.target.value)}
                                />
                            </div>
                            <button onClick={fetchData} className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded">
                                Tampilkan
                            </button>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-2 rounded transition">
                                Download Laporan
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">Perbandingan Aset Neto</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="px-3 py-2">Komponen</th>
                                    <th className="px-3 py-2">Saldo Awal</th>
                                    <th className="px-3 py-2">Surplus/Defisit</th>
                                    <th className="px-3 py-2">Total Akhir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report ? (
                                    <tr className="text-center border-b">
                                        <td className="px-3 py-2 font-medium">Aset Neto</td>
                                        <td className="px-3 py-2">Rp {report.saldo_awal.toLocaleString()}</td>
                                        <td className="px-3 py-2">{report.surplus_berjalan.toLocaleString()}</td>
                                        <td className="px-3 py-2 font-bold">Rp {report.total_aset_neto_akhir.toLocaleString()}</td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6 text-gray-500 italic">Silakan pilih tanggal dan tampilkan data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {report && (
                            <div className="mt-4 p-3 bg-gray-50 text-sm italic text-gray-600">
                                {report.catatan}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerubahanAsetNeto;