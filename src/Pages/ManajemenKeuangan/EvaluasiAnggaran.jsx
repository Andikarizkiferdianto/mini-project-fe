import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar";

const EvaluasiAnggaran = () => {

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 overflow-x-auto">

                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">

                    {/* HEADER */}
                    <div className="border-b border-gray-300 px-4 py-3 bg-gray-100">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Evaluasi Anggaran Tahun 2025/2026
                        </h1>
                    </div>

                    {/* TABEL */}
                    <div className="p-4 overflow-x-auto">

                        <table className="min-w-full border border-gray-300 text-sm">

                            {/* HEADER */}
                            <thead className="bg-violet-600 text-white">
                                <tr>
                                    <th className="border border-gray-300 px-3 py-2">
                                        No
                                    </th>

                                    <th className="border border-gray-300 px-3 py-2">
                                        Kode Akun
                                    </th>

                                    <th className="border border-gray-300 px-3 py-2">
                                        Nama Akun
                                    </th>

                                    <th className="border border-gray-300 px-3 py-2">
                                        Kelompok
                                    </th>

                                    <th className="border border-gray-300 px-3 py-2">
                                        Pagu
                                    </th>

                                    <th className="border border-gray-300 px-3 py-2">
                                        Q1
                                    </th>

                                    <th className="border border-gray-300 px-3 py-2">
                                        Q2
                                    </th>

                                    <th className="border border-gray-300 px-3 py-2">
                                        Q3
                                    </th>

                                    <th className="border border-gray-300 px-3 py-2">
                                        Q4
                                    </th>

                                    <th className="border border-gray-300 px-3 py-2">
                                        Total Realisasi
                                    </th>

                                    <th className="border border-gray-300 px-3 py-2">
                                        Sisa / Surplus
                                    </th>

                                    <th className="border border-gray-300 px-3 py-2">
                                        Forecast
                                    </th>

                                    <th className="border border-gray-300 px-3 py-2">
                                        %
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {/* PENDAPATAN */}
                                <tr className="bg-violet-100 font-bold">
                                    <td
                                        colSpan="13"
                                        className="border border-gray-300 px-3 py-2 text-left"
                                    >
                                        PENDAPATAN
                                    </td>
                                </tr>

                                {/* ROW KOSONG */}
                                <tr>
                                    {Array.from({ length: 13 }).map((_, index) => (
                                        <td
                                            key={index}
                                            className="border border-gray-300 px-3 py-5"
                                        ></td>
                                    ))}
                                </tr>

                                {/* TOTAL PENDAPATAN */}
                                <tr className="bg-violet-50 font-bold">
                                    <td
                                        colSpan="4"
                                        className="border border-gray-300 px-3 py-3 text-right"
                                    >
                                        TOTAL PENDAPATAN
                                    </td>

                                    {Array.from({ length: 9 }).map((_, index) => (
                                        <td
                                            key={index}
                                            className="border border-gray-300 px-3 py-3"
                                        ></td>
                                    ))}
                                </tr>

                                {/* BELANJA */}
                                <tr className="bg-violet-100 font-bold">
                                    <td
                                        colSpan="13"
                                        className="border border-gray-300 px-3 py-2 text-left"
                                    >
                                        BELANJA
                                    </td>
                                </tr>

                                {/* ROW KOSONG */}
                                <tr>
                                    {Array.from({ length: 13 }).map((_, index) => (
                                        <td
                                            key={index}
                                            className="border border-gray-300 px-3 py-5"
                                        ></td>
                                    ))}
                                </tr>

                                {/* TOTAL BELANJA */}
                                <tr className="bg-violet-50 font-bold">
                                    <td
                                        colSpan="4"
                                        className="border border-gray-300 px-3 py-3 text-right"
                                    >
                                        TOTAL BELANJA
                                    </td>

                                    {Array.from({ length: 9 }).map((_, index) => (
                                        <td
                                            key={index}
                                            className="border border-gray-300 px-3 py-3"
                                        ></td>
                                    ))}
                                </tr>

                                {/* TOTAL KESELURUHAN */}
                                <tr className="bg-violet-200 font-bold">
                                    <td
                                        colSpan="4"
                                        className="border border-gray-300 px-3 py-3 text-center"
                                    >
                                        TOTAL KESELURUHAN
                                    </td>

                                    {Array.from({ length: 9 }).map((_, index) => (
                                        <td
                                            key={index}
                                            className="border border-gray-300 px-3 py-3"
                                        ></td>
                                    ))}
                                </tr>

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EvaluasiAnggaran;