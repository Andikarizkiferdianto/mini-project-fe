import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";

const NeracaSaldo = () => {
    const [tglAkhir, setTglAkhir] = useState("");
    const [data, setData] = useState([]);
    const [summary, setSummary] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/jurnal/neraca-saldo?end=${tglAkhir}`);
            setData(res.data.data);
            setSummary(res.data.summary);
        } catch (err) {
            alert("Gagal mengambil data: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6 mt-16 space-y-6">
                <div className="font-semibold text-xl">Neraca Saldo</div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="bg-violet-500 text-white px-4 py-2 rounded-t mb-4">Filter Periode</div>
                    <div className="flex items-end gap-4">
                        <div>
                            <label className="block text-sm mb-1">Sampai Tanggal</label>
                            <input 
                                type="date" 
                                className="border border-gray-200 rounded px-3 py-2" 
                                onChange={(e) => setTglAkhir(e.target.value)}
                            />
                        </div>
                        <button onClick={fetchData} className="bg-green-600 text-white px-5 py-2 rounded">Tampilkan</button>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                    <table className="min-w-full text-sm">
                        <thead className="bg-violet-600 text-white">
                            <tr>
                                <th className="py-2 px-3">Kode Akun</th>
                                <th className="py-2 px-3">Nama Akun</th>
                                <th className="py-2 px-3 text-right">Debit (Rp)</th>
                                <th className="py-2 px-3 text-right">Kredit (Rp)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, i) => (
                                <tr key={i} className="border-t">
                                    <td className="py-2 px-3">{item.kode_akun}</td>
                                    <td className="py-2 px-3">{item.nama_akun}</td>
                                    <td className="py-2 px-3 text-right">{item.debet.toLocaleString()}</td>
                                    <td className="py-2 px-3 text-right">{item.kredit.toLocaleString()}</td>
                                </tr>
                            ))}
                            {summary && (
                                <tr className="bg-violet-200 font-bold">
                                    <td className="py-2 px-3" colSpan="2">TOTAL</td>
                                    <td className="py-2 px-3 text-right">{summary.grand_total_debet.toLocaleString()}</td>
                                    <td className="py-2 px-3 text-right">{summary.grand_total_kredit.toLocaleString()}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default NeracaSaldo;