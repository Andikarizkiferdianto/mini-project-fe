import React from "react";
import Sidebar from "../../components/Sidebar";
import {
    DollarSign,
    Wallet,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

const DashboardKeuangan = () => {
    const data = []; // 🔥 kosong

    const formatRupiah = (num = 0) =>
        "Rp " + num.toLocaleString("id-ID");

    const totalNominal = data.reduce((a, b) => a + (b.nominal || 0), 0);
    const totalKetetapan = data.reduce((a, b) => a + (b.ketetapan || 0), 0);
    const totalKekurangan = totalKetetapan - totalNominal;

    const persen =
        totalKetetapan === 0 ? 0 : (totalNominal / totalKetetapan) * 100;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                {/* ================= SUMMARY CARD ================= */}
                <div className="grid grid-cols-4 gap-4">
                    {[
                        {
                            title: "Pembayaran Mei",
                            icon: <DollarSign size={16} />,
                            color: "bg-blue-100 text-blue-600",
                        },
                        {
                            title: "Penerimaan Mei",
                            icon: <Wallet size={16} />,
                            color: "bg-green-100 text-green-600",
                        },
                        {
                            title: "Belanja Mei",
                            icon: <TrendingDown size={16} />,
                            color: "bg-red-100 text-red-600",
                        },
                        {
                            title: "Surplus / Defisit",
                            icon: <TrendingUp size={16} />,
                            color: "bg-green-100 text-green-600",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white p-4 rounded shadow border border-gray-200 relative"
                        >
                            <p className="text-sm text-gray-500">
                                {item.title}
                            </p>

                            <h2 className="text-xl font-bold">Rp 0</h2>

                            {/* ICON BULAT */}
                            <div
                                className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full ${item.color}`}
                            >
                                {item.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ================= RINGKASAN + PIE ================= */}
                <div className="grid grid-cols-4 gap-4">

                    {/* tabel ringkasan pembayaran */}
                    <div className="col-span-3 bg-white rounded shadow border border-gray-200">
                        <div className="bg-violet-600 text-white px-4 py-2 font-semibold">
                            Ringkasan Pembayaran TA. 2025/2026
                        </div>

                        <table className="w-full text-sm border">
                            <thead className="bg-gray-200 text-center">
                                <tr>
                                    <th className="p-2">Kategori</th>
                                    <th className="p-2">Nominal</th>
                                    <th className="p-2">Ketetapan</th>
                                    <th className="p-2">Kekurangan</th>
                                    <th className="p-2">Progress</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center p-4 text-gray-400"
                                        >
                                            Belum ada data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PIE CHART */}
                    <div className="bg-white rounded shadow border border-gray-200 p-4 flex flex-col items-center justify-center">
                        <h2 className="text-sm font-semibold mb-2">
                            Presentase Realisasi
                        </h2>

                        <div className="relative w-32 h-32 rounded-full bg-gray-200">
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: `conic-gradient(red ${100 - persen}%, green ${persen}%)`,
                                }}
                            ></div>
                        </div>

                        <div className="mt-3 text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500"></div>
                                Realisasi
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500"></div>
                                Belum Realisasi
                            </div>
                        </div>
                    </div>
                </div>

                {/* tabel realisasi */}
                <div className="bg-white rounded shadow border border-gray-200">
                    <div className="bg-gray-700 text-white px-4 py-2 font-semibold">
                        Realisasi Pembayaran TA. 2025/2026
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border">
                            <thead className="bg-gray-200 text-center">
                                <tr>
                                    <th className="p-2">Kategori</th>
                                    {[
                                        "Jul", "Ags", "Sep", "Okt", "Nov", "Des",
                                        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun"
                                    ].map((b, i) => (
                                        <th key={i}>{b}</th>
                                    ))}
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td
                                        colSpan="14"
                                        className="text-center p-4 text-gray-400"
                                    >
                                        Belum ada data
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* tabel grafik */}
                <div className="bg-white rounded shadow border border-gray-200">
                    <div className="bg-gray-800 text-white px-4 py-2 font-semibold">
                        Grafik Pembayaran TA. 2025/2026
                    </div>

                    <div className="p-4 text-center text-gray-400">
                        Belum ada data grafik
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardKeuangan;