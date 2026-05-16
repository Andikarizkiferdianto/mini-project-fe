import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";

const LaporanBelanja = () => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const fetchLaporan = async () => {
        try {
            setLoading(true);

            let url = "http://localhost:8000/api/belanja/laporan";

            if (start && end) {
                url += `?start=${start}&end=${end}`;
            }

            const response = await fetch(url);
            const result = await response.json();

            if (result.status === "success") {
                setData(result.data);

                const totalNominal = result.data.reduce(
                    (acc, item) => acc + Number(item.nominal),
                    0
                );

                setTotal(totalNominal);
            }
        } catch (error) {
            console.log("Gagal mengambil laporan:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLaporan();
    }, []);

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(angka);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">

                    <div className="bg-violet-500 text-white text-xl px-4 py-3 font-semibold">
                        Laporan Belanja
                    </div>

                    {/* FILTER */}
                    <div className="bg-gray-50 border-b border-gray-200 p-4">
                        <div className="flex items-end gap-4">

                            <div className="flex-1">
                                <label className="block text-sm mb-1">
                                    Tanggal Awal
                                </label>

                                <input
                                    type="date"
                                    value={start}
                                    onChange={(e) => setStart(e.target.value)}
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm mb-1">
                                    Tanggal Akhir
                                </label>

                                <input
                                    type="date"
                                    value={end}
                                    onChange={(e) => setEnd(e.target.value)}
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                />
                            </div>

                            <button
                                onClick={fetchLaporan}
                                className="bg-violet-600 hover:bg-violet-700 text-white px-10 py-2 rounded"
                            >
                                Filter
                            </button>

                        </div>
                    </div>

                    {/* TOTAL */}
                    <div className="p-4 border-b bg-violet-50">
                        <h2 className="text-lg font-semibold text-violet-700">
                            Total Belanja : {formatRupiah(total)}
                        </h2>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead className="bg-violet-600 text-white">
                                <tr>
                                    <th className="px-4 py-3 border">No</th>
                                    <th className="px-4 py-3 border">Tanggal</th>
                                    <th className="px-4 py-3 border">Keterangan</th>
                                    <th className="px-4 py-3 border">Nominal</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="text-center py-6"
                                        >
                                            Loading...
                                        </td>
                                    </tr>
                                ) : data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-3 border text-center">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-3 border">
                                                {item.tanggal}
                                            </td>

                                            <td className="px-4 py-3 border">
                                                {item.keterangan}
                                            </td>

                                            <td className="px-4 py-3 border">
                                                {formatRupiah(item.nominal)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="text-center py-6 text-gray-500"
                                        >
                                            Tidak ada data
                                        </td>
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

export default LaporanBelanja;