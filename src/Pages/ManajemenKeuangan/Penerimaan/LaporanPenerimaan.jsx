import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import Swal from "sweetalert2";

const API = "http://localhost:8000/api/penerimaan/laporan";

const LaporanPenerimaan = () => {

    const [data, setData] = useState([]);

    const [form, setForm] = useState({
        start: "",
        end: ""
    });

    const [total, setTotal] = useState(0);

    const fetchData = async (start = "", end = "") => {
        try {

            let url = API;

            if (start && end) {
                url += `?start=${start}&end=${end}`;
            }

            const res = await fetch(url);
            const result = await res.json();

            if (result.status === "success") {
                setData(result.data || []);
                setTotal(result.total_penerimaan || 0);
            }

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFilter = () => {

        if (!form.start || !form.end) {
            Swal.fire(
                "Warning",
                "Tanggal awal dan tanggal akhir wajib diisi",
                "warning"
            );
            return;
        }

        fetchData(form.start, form.end);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                {/* HEADER */}
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">

                    <div className="bg-violet-500 text-white text-xl px-4 py-3 font-semibold">
                        Laporan Penerimaan
                    </div>

                    {/* FILTER */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-end gap-4">

                            <div className="flex-1">
                                <label className="block text-sm mb-1">
                                    Tanggal Awal
                                </label>

                                <input
                                    type="date"
                                    value={form.start}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            start: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm mb-1">
                                    Tanggal Akhir
                                </label>

                                <input
                                    type="date"
                                    value={form.end}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            end: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                />
                            </div>

                            <button
                                onClick={handleFilter}
                                className="bg-violet-600 hover:bg-violet-700 text-white px-20 py-2 rounded"
                            >
                                Filter
                            </button>

                        </div>
                    </div>

                </div>

                {/* TOTAL */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-4">

                    <h2 className="text-lg font-semibold mb-2">
                        Total Penerimaan
                    </h2>

                    <p className="text-2xl font-bold text-green-600">
                        Rp {Number(total).toLocaleString("id-ID")}
                    </p>

                </div>

                {/* TABLE */}
                <div className="bg-white rounded-lg shadow p-4">

                    <h2 className="text-lg font-semibold mb-4">
                        Data Laporan Penerimaan
                    </h2>

                    {/* TOP */}
                    <div className="flex justify-between items-center mb-3">

                        <div className="flex gap-2">
                            <button className="border px-3 py-1 text-xs rounded">
                                Copy
                            </button>

                            <button className="border px-3 py-1 text-xs rounded">
                                CSV
                            </button>

                            <button className="border px-3 py-1 text-xs rounded">
                                Excel
                            </button>

                            <button className="border px-3 py-1 text-xs rounded">
                                PDF
                            </button>

                            <button className="border px-3 py-1 text-xs rounded">
                                Print
                            </button>
                        </div>

                        <div className="flex items-center gap-2">

                            <span className="text-sm">
                                Search:
                            </span>

                            <div className="flex items-center border rounded px-2">
                                <Search size={16} />

                                <input
                                    type="text"
                                    className="outline-none px-2 py-1 text-sm"
                                />
                            </div>

                        </div>

                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">

                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">

                            <thead className="bg-violet-600 text-white text-center">

                                <tr>
                                    <th className="px-3 py-2">No</th>
                                    <th className="px-3 py-2">Kode Transaksi</th>
                                    <th className="px-3 py-2">Jenis Penerimaan</th>
                                    <th className="px-3 py-2">Sumber</th>
                                    <th className="px-3 py-2">Nominal</th>
                                    <th className="px-3 py-2">Tanggal</th>
                                    <th className="px-3 py-2">Menyetujui</th>
                                    <th className="px-3 py-2">Keterangan</th>
                                </tr>

                            </thead>

                            <tbody>

                                {data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="border-t text-center"
                                        >

                                            <td className="px-3 py-2">
                                                {index + 1}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.kode_transaksi}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.jenis_penerimaan}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.sumber}
                                            </td>

                                            <td className="px-3 py-2">
                                                Rp {Number(item.nominal).toLocaleString("id-ID")}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.tanggal?.split("T")[0]}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.menyetujui}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.keterangan}
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="text-center py-4 text-gray-500"
                                        >
                                            Data tidak tersedia
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

export default LaporanPenerimaan;