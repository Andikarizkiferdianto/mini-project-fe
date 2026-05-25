import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";

const PosisiKeuangan = () => {
    const [tglAkhir, setTglAkhir] = useState("");
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/laporan/posisi-keuangan?end=${tglAkhir}`);
            setData(res.data.data);
        } catch (err) {
            alert("Gagal mengambil data: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6 mt-16 space-y-6">
                <h1 className="text-3xl font-semibold text-gray-800">Laporan Posisi Keuangan (Neraca)</h1>

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <div className="bg-violet-600 text-white px-4 py-3 font-semibold">Filter Periode</div>
                    <div className="p-4 bg-gray-50">
                        <div className="flex flex-wrap items-end gap-4">
                            <div className="flex-1 min-w-[250px]">
                                <label className="block text-sm mb-2 font-medium">Tanggal Per</label>
                                <input 
                                    type="date" 
                                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                                    onChange={(e) => setTglAkhir(e.target.value)}
                                />
                            </div>
                            <button onClick={fetchData} className="bg-green-600 hover:bg-green-700 text-white px-20 py-2 rounded-md font-medium">
                                Tampilkan
                            </button>
                        </div>
                    </div>
                </div>

                {data && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Aset */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-sky-600 text-white px-4 py-3 font-semibold text-lg">Aset</div>
                            <div className="p-4 space-y-5">
                                <div>
                                    <h2 className="font-semibold text-xl mb-3">Daftar Aset</h2>
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        {data.aset.items.map((item, i) => (
                                            <div key={i} className="flex justify-between px-4 py-3 border-b">
                                                <span>{item.nama_akun}</span>
                                                <span>Rp {item.jumlah.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-right font-semibold text-lg">Total Aset: Rp {data.aset.total.toLocaleString()}</div>
                            </div>
                        </div>

                        {/* Liabilitas & Ekuitas */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-yellow-600 text-white px-4 py-3 font-semibold text-lg">Liabilitas & Aset Neto</div>
                            <div className="p-4 space-y-5">
                                <div>
                                    <h2 className="font-semibold text-md mb-3">Liabilitas</h2>
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        {data.liabilitas.items.map((item, i) => (
                                            <div key={i} className="flex justify-between px-4 py-3 border-b">
                                                <span>{item.nama_akun}</span>
                                                <span>Rp {item.jumlah.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-md mb-3">Aset Neto (Ekuitas)</h2>
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        {data.aset_neto.items.map((item, i) => (
                                            <div key={i} className="flex justify-between px-4 py-3 border-b">
                                                <span>{item.nama_akun}</span>
                                                <span>Rp {item.jumlah.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-right font-semibold text-lg">
                                    Total Liabilitas & Aset Neto: Rp {data.total_liabilitas_dan_aset_neto.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default PosisiKeuangan;