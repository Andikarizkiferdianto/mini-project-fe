import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";

const JurnalUmum = () => {
    const [filter, setFilter] = useState({ start: "", end: "" });
    const [data, setData] = useState([]);
    const [summary, setSummary] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/jurnal/umum`, { params: filter });
            setData(res.data.data);
            setSummary(res.data.summary);
        } catch (err) {
            alert("Gagal memuat data: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6 mt-16 space-y-6">
                <div className="font-semibold text-xl">Jurnal Umum</div>
                
                {/* Filter */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-end gap-4">
                        <div>
                            <label className="block text-sm">Tanggal Awal</label>
                            <input type="date" className="border border-gray-200 rounded px-3 py-2" onChange={(e) => setFilter({...filter, start: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm">Tanggal Akhir</label>
                            <input type="date" className="border border-gray-200 rounded px-3 py-2" onChange={(e) => setFilter({...filter, end: e.target.value})} />
                        </div>
                        <button onClick={fetchData} className="bg-green-600 text-white px-5 py-2 rounded">Tampilkan</button>
                    </div>
                </div>

                {/* Tabel */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="min-w-full text-sm">
                        <thead className="bg-violet-600 text-white">
                            <tr>
                                <th className="py-2 px-3">Tanggal</th>
                                <th className="py-2 px-3">Kode Akun</th>
                                <th className="py-2 px-3">Nama Akun</th>
                                <th className="py-2 px-3 text-right">Debit</th>
                                <th className="py-2 px-3 text-right">Kredit</th>
                                <th className="py-2 px-3">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((item, i) => (
                                <tr key={i}>
                                    <td className="py-2 px-3">{item.tanggal}</td>
                                    <td className="py-2 px-3">{item.kode_akun}</td>
                                    <td className="py-2 px-3">{item.nama_akun}</td>
                                    <td className="py-2 px-3 text-right">{item.debet.toLocaleString()}</td>
                                    <td className="py-2 px-3 text-right">{item.kredit.toLocaleString()}</td>
                                    <td className="py-2 px-3">{item.keterangan}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan="6" className="text-center py-6 text-gray-500 italic">Data tidak ditemukan</td></tr>
                            )}
                        </tbody>
                        {summary && (
                            <tfoot className="bg-violet-200 font-bold">
                                <tr>
                                    <td colSpan="3" className="py-2 px-3 text-right">TOTAL</td>
                                    <td className="py-2 px-3 text-right">{summary.total_debet.toLocaleString()}</td>
                                    <td className="py-2 px-3 text-right">{summary.total_kredit.toLocaleString()}</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
};
export default JurnalUmum;