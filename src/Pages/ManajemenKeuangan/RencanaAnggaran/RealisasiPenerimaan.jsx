import React from "react";
import Sidebar from "../../../components/Sidebar";

const RealisasiPenerimaan = () => {

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6 overflow-x-auto">
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">

                     <div className="border-b border-gray-300 px-4 py-3 bg-gray-50">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Realisasi Penerimaan Tahun Ajaran 2025/2026
                        </h1>
                    </div>

                     <div className="flex justify-between items-center px-4 py-3">
                        <div className="flex gap-2">
                            <button className="border border-gray-300 px-4 py-1 bg-gray-100 hover:bg-gray-200 text-sm">
                                Copy
                            </button>

                            <button className="border border-gray-300 px-4 py-1 bg-gray-100 hover:bg-gray-200 text-sm">
                                CSV
                            </button>

                            <button className="border border-gray-300 px-4 py-1 bg-gray-100 hover:bg-gray-200 text-sm">
                                Excel
                            </button>

                            <button className="border border-gray-300 px-4 py-1 bg-gray-100 hover:bg-gray-200 text-sm">
                                PDF
                            </button>

                            <button className="border border-gray-300 px-4 py-1 bg-gray-100 hover:bg-gray-200 text-sm">
                                Print
                            </button>
                        </div>

                         <div className="flex items-center gap-2 text-sm">
                            <span>Search:</span>

                            <input
                                type="text"
                                className="border border-gray-300 px-2 py-1 rounded outline-none"
                            />
                        </div>
                    </div>

                     <div className="overflow-x-auto w-full">

                        <table className="min-w-max text-sm border border-gray-300">

                            <thead className="bg-violet-600 text-white text-center">

                                <tr>
                                    <th
                                        rowSpan="2"
                                        className="border border-gray-300 px-4 py-3"
                                    >
                                        No
                                    </th>

                                    <th
                                        rowSpan="2"
                                        className="border border-gray-300 px-4 py-3"
                                    >
                                        Kode Akun
                                    </th>

                                    <th
                                        rowSpan="2"
                                        className="border border-gray-300 px-4 py-3"
                                    >
                                        Nama Akun
                                    </th>

                                    <th
                                        colSpan="12"
                                        className="border border-gray-300 px-4 py-3"
                                    >
                                        Bulan
                                    </th>

                                    <th
                                        rowSpan="2"
                                        className="border border-gray-300 px-4 py-3"
                                    >
                                        Total
                                    </th>
                                </tr>

                                <tr>
                                    <th className="border border-gray-300 px-3 py-2">Juli</th>
                                    <th className="border border-gray-300 px-3 py-2">Agustus</th>
                                    <th className="border border-gray-300 px-3 py-2">September</th>
                                    <th className="border border-gray-300 px-3 py-2">Oktober</th>
                                    <th className="border border-gray-300 px-3 py-2">November</th>
                                    <th className="border border-gray-300 px-3 py-2">Desember</th>
                                    <th className="border border-gray-300 px-3 py-2">Januari</th>
                                    <th className="border border-gray-300 px-3 py-2">Februari</th>
                                    <th className="border border-gray-300 px-3 py-2">Maret</th>
                                    <th className="border border-gray-300 px-3 py-2">April</th>
                                    <th className="border border-gray-300 px-3 py-2">Mei</th>
                                    <th className="border border-gray-300 px-3 py-2">Juni</th>
                                </tr>

                            </thead>

                            <tbody>

                                 <tr>
                                    <td
                                        colSpan="16"
                                        className="border border-gray-300 px-3 py-6 text-center text-gray-500"
                                    >
                                        Tidak ada data
                                    </td>
                                </tr>

                                <tr className="font-bold bg-violet-50">

                                    <td
                                        colSpan="3"
                                        className="border border-gray-300 px-3 py-3 text-center"
                                    >
                                        Total Penerimaan
                                    </td>

                                    <td className="border border-gray-300 px-3 py-3 text-right">0</td>
                                    <td className="border border-gray-300 px-3 py-3 text-right">0</td>
                                    <td className="border border-gray-300 px-3 py-3 text-right">0</td>
                                    <td className="border border-gray-300 px-3 py-3 text-right">0</td>
                                    <td className="border border-gray-300 px-3 py-3 text-right">0</td>
                                    <td className="border border-gray-300 px-3 py-3 text-right">0</td>
                                    <td className="border border-gray-300 px-3 py-3 text-right">0</td>
                                    <td className="border border-gray-300 px-3 py-3 text-right">0</td>
                                    <td className="border border-gray-300 px-3 py-3 text-right">0</td>
                                    <td className="border border-gray-300 px-3 py-3 text-right">0</td>
                                    <td className="border border-gray-300 px-3 py-3 text-right">0</td>
                                    <td className="border border-gray-300 px-3 py-3 text-right">0</td>

                                    <td className="border border-gray-300 px-3 py-3 text-right">
                                        0
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                     <div className="flex justify-between items-center px-4 py-3 text-sm">

                        <div>
                            Showing 1 to 2 of 2 entries
                        </div>

                        <div className="flex items-center gap-2">

                            <button className="border border-gray-300 px-3 py-1 bg-gray-100 hover:bg-gray-200">
                                Previous
                            </button>

                            <button className="border border-gray-300 px-3 py-1 bg-gray-500 text-white">
                                1
                            </button>

                            <button className="border border-gray-300 px-3 py-1 bg-gray-100 hover:bg-gray-200">
                                Next
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RealisasiPenerimaan;