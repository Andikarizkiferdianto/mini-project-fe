import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";

const ArusKas = () => {
    const [filter, setFilter] = useState({ start: "", end: "" });
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/laporan/arus-kas`, { params: filter });
            setData(res.data.data);
        } catch (err) {
            alert("Gagal memuat data: " + (err.response?.data?.message || err.message));
        }
    };

    const renderTable = (items, title) => (
        <>
            <h2 className="text-lg mt-4 font-semibold mb-2">{title}</h2>
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-violet-600 text-white">
                    <tr>
                        <th className="px-3 py-3 text-left">Keterangan</th>
                        <th className="px-5 py-3 text-right">Nominal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? items.map((item, i) => (
                        <tr key={i} className="border-b">
                            <td className="px-3 py-3">{item.keterangan}</td>
                            <td className="px-5 py-3 text-right">{item.jumlah.toLocaleString()}</td>
                        </tr>
                    )) : (
                        <tr><td colSpan="2" className="text-center py-6 text-gray-500 italic">Belum ada transaksi</td></tr>
                    )}
                </tbody>
            </table>
        </>
    );

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6 mt-16 space-y-6">
                <div className="font-semibold text-xl">Laporan Arus Kas</div>

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <div className="bg-violet-500 text-white px-4 py-3 font-semibold">Filter Periode</div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-end gap-4">
                            <div className="flex-1">
                                <label className="block text-sm mb-3">Tanggal Awal</label>
                                <input type="date" className="w-full border border-gray-200 rounded px-3 py-2" onChange={(e) => setFilter({...filter, start: e.target.value})} />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm mb-3">Tanggal Akhir</label>
                                <input type="date" className="w-full border border-gray-200 rounded px-3 py-2" onChange={(e) => setFilter({...filter, end: e.target.value})} />
                            </div>
                            <button onClick={fetchData} className="bg-green-600 hover:bg-green-700 text-white px-20 py-2 rounded">Tampilkan</button>
                        </div>
                    </div>
                </div>

                <div className="bg-violet-600 text-white px-4 py-3 rounded-t-lg font-semibold">Ringkasan Arus Kas</div>
                <div className="bg-white shadow p-4">
                    {data ? (
                        <>
                            {renderTable(data.operasi.items, "Operasi")}
                            {renderTable(data.investasi.items, "Investasi")}
                            {renderTable(data.pendanaan.items, "Pendanaan")}
                            <div className="mt-6 p-4 bg-gray-100 font-bold text-right text-lg">
                                Total Kenaikan/Penurunan Kas: Rp {data.kenaikan_penurunan_kas.toLocaleString()}
                            </div>
                        </>
                    ) : (
                        <p className="text-center py-10 text-gray-500">Silakan pilih periode dan klik tampilkan.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArusKas;