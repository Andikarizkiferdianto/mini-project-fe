import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

const RiwayatMengajar = () => {
    const [tahun, setTahun] = useState("2025/2026");
    const [guru, setGuru] = useState("");
    const [kelas, setKelas] = useState("");

     const data = [];

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16">

                 <h1 className="text-2xl font-semibold mb-4">
                    Riwayat Mengajar
                </h1>

                {/* FILTER */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

                    <div>
                        <label className="text-sm">Filter Tahun Ajaran:</label>
                        <select
                            value={tahun}
                            onChange={(e) => setTahun(e.target.value)}
                            className="w-full border p-2 rounded mt-1"
                        >
                            <option>-- Pilih Tahun Ajaran --</option>
                         </select>
                    </div>

                    <div>
                        <label className="text-sm">Filter Guru:</label>
                        <select
                            value={guru}
                            onChange={(e) => setGuru(e.target.value)}
                            className="w-full border p-2 rounded mt-1"
                        >
                            <option value="">-- Semua Guru --</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm">Filter Kelas:</label>
                        <select
                            value={kelas}
                            onChange={(e) => setKelas(e.target.value)}
                            className="w-full border p-2 rounded mt-1"
                        >
                            <option value="">-- Semua Kelas --</option>
                        </select>
                    </div>

                </div>

                {/* TOTAL */}
                <div className="mb-4 font-medium">
                    Total Sesi Mengajar (unik):{" "}
                    <span className="text-violet-600">0 sesi</span>
                </div>

                {/* STATISTIK */}
                <div className="bg-white rounded shadow mb-6">
                    <div className="bg-violet-600 text-white px-4 py-2 font-semibold rounded-t">
                        📊 Statistik Mengajar per Guru
                    </div>

                    <div className="p-4">
                        {data.length === 0 ? (
                            <div className="text-gray-400 text-center">
                                Belum ada data
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {/* nanti diisi map */}
                            </div>
                        )}
                    </div>
                </div>

                {/* tabel */}
                <div className="bg-white rounded shadow">
                    <div className="p-4 font-semibold">
                        Riwayat Kehadiran Mengajar 
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border">
                            <thead className="bg-gray-200 text-center">
                                <tr>
                                    <th className="p-2">No</th>
                                    <th className="p-2">Tanggal</th>
                                    <th className="p-2">Jam ke-</th>
                                    <th className="p-2">Mapel</th>
                                    <th className="p-2">Guru</th>
                                    <th className="p-2">Siswa</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Keterangan</th>
                                    <th className="p-2">Waktu Absen</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="text-center p-4 text-gray-400">
                                            Belum ada data
                                        </td>
                                    </tr>
                                ) : (
                                        <tr className="text-center border-t">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RiwayatMengajar;