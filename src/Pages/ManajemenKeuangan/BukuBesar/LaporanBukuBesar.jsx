import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";

const LaporanBukuBesar = () => {
    const [filter, setFilter] = useState({ kode_akun: "", start: "", end: "" });
    const [data, setData] = useState([]);
    const [info, setInfo] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/jurnal/buku-besar`, { params: filter });
            setData(res.data.data);
            setInfo(res.data.info);
        } catch (err) {
            alert("Gagal mengambil data: " + err.response?.data?.message);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6 mt-16 space-y-6">
                <div className="bg-white p-4 rounded-lg border flex gap-4 items-end">
                    <div>
                        <label className="block text-sm">Kode Akun</label>
                        <input className="border p-2 rounded" onChange={(e) => setFilter({...filter, kode_akun: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm">Tgl Awal</label>
                        <input type="date" className="border p-2 rounded" onChange={(e) => setFilter({...filter, start: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm">Tgl Akhir</label>
                        <input type="date" className="border p-2 rounded" onChange={(e) => setFilter({...filter, end: e.target.value})} />
                    </div>
                    <button onClick={fetchData} className="bg-green-600 text-white px-5 py-2 rounded">Tampilkan</button>
                </div>

                {info && (
                    <div className="bg-white p-4 rounded border shadow-sm">
                        <h3 className="font-bold">Saldo Akhir: Rp {info.summary.saldo_akhir.toLocaleString()}</h3>
                    </div>
                )}

                <table className="min-w-full bg-white border">
                    <thead className="bg-violet-600 text-white">
                        <tr>
                            <th className="py-2 px-3">Tanggal</th>
                            <th className="py-2 px-3">Keterangan</th>
                            <th className="py-2 px-3 text-right">Debit</th>
                            <th className="py-2 px-3 text-right">Kredit</th>
                            <th className="py-2 px-3 text-right">Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i} className="border-t text-sm">
                                <td className="py-2 px-3">{item.tanggal}</td>
                                <td className="py-2 px-3">{item.keterangan}</td>
                                <td className="py-2 px-3 text-right">{item.debet.toLocaleString()}</td>
                                <td className="py-2 px-3 text-right">{item.kredit.toLocaleString()}</td>
                                <td className="py-2 px-3 text-right font-bold">{item.saldo.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default LaporanBukuBesar;