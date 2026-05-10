import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../../../components/Sidebar";

const APBSDetail = () => {

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6 overflow-x-auto">
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">

                    <div className="border-b border-gray-300 px-4 py-3 bg-gray-50">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            APBD Detail Tahun Ajaran 2025/2026
                        </h1>
                    </div>

                    {/* TABEL */}
                    <div className="p-4">
                        <div className="overflow-x-auto">

                            <table className="min-w-max border border-gray-300 text-sm">

                                <thead className="bg-violet-600 text-white">
                                    <tr>
                                        <th
                                            rowSpan="2"
                                            className="border border-gray-300 px-3 py-3"
                                        >
                                            No
                                        </th>

                                        <th
                                            rowSpan="2"
                                            className="border border-gray-300 px-3 py-3"
                                        >
                                            Kode Akun
                                        </th>

                                        <th
                                            rowSpan="2"
                                            className="border border-gray-300 px-3 py-3"
                                        >
                                            Nama Akun
                                        </th>

                                        <th
                                            colSpan="12"
                                            className="border border-gray-300 px-3 py-3 text-center"
                                        >
                                            Bulan
                                        </th>

                                        <th
                                            rowSpan="2"
                                            className="border border-gray-300 px-3 py-3"
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
                                    <tr className="bg-violet-100 font-bold">
                                        <td
                                            colSpan="16"
                                            className="border border-gray-300 px-3 py-2 text-left"
                                        >
                                            PENDAPATAN
                                        </td>
                                    </tr>

                                    <tr>
                                        {Array.from({ length: 16 }).map((_, index) => (
                                            <td
                                                key={index}
                                                className="border border-gray-300 px-3 py-3"
                                            >
                                            </td>
                                        ))}
                                    </tr>

                                    <tr className="bg-violet-50 font-bold">
                                        <td
                                            colSpan="3"
                                            className="border border-gray-300 px-3 py-3 text-center"
                                        >
                                            TOTAL PENDAPATAN
                                        </td>

                                        {Array.from({ length: 13 }).map((_, index) => (
                                            <td
                                                key={index}
                                                className="border border-gray-300 px-3 py-3"
                                            >
                                            </td>
                                        ))}
                                    </tr>

                                    <tr className="bg-violet-100 font-bold">
                                        <td
                                            colSpan="16"
                                            className="border border-gray-300 px-3 py-2 text-left"
                                        >
                                            BELANJA
                                        </td>
                                    </tr>

                                    <tr>
                                        {Array.from({ length: 16 }).map((_, index) => (
                                            <td
                                                key={index}
                                                className="border border-gray-300 px-3 py-3"
                                            >
                                            </td>
                                        ))}
                                    </tr>

                                    <tr className="bg-violet-50 font-bold">
                                        <td
                                            colSpan="3"
                                            className="border border-gray-300 px-3 py-3 text-center"
                                        >
                                            TOTAL BELANJA
                                        </td>

                                        {Array.from({ length: 13 }).map((_, index) => (
                                            <td
                                                key={index}
                                                className="border border-gray-300 px-3 py-3"
                                            >
                                            </td>
                                        ))}
                                    </tr>

                                    <tr className="bg-violet-200 font-bold">
                                        <td
                                            colSpan="3"
                                            className="border border-gray-300 px-3 py-3 text-center"
                                        >
                                            TOTAL KESELURUHAN
                                        </td>

                                        {Array.from({ length: 13 }).map((_, index) => (
                                            <td
                                                key={index}
                                                className="border border-gray-300 px-3 py-3"
                                            >
                                            </td>
                                        ))}
                                    </tr>

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default APBSDetail;