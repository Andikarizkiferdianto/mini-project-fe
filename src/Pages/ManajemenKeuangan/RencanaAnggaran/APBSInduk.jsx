import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../../../components/Sidebar";

const APBSInduk = () => {

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6 overflow-x-auto">
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">

                    {/* HEADER */}
                    <div className="border-b border-gray-300 px-4 py-3 bg-gray-50">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Rekapitulasi APBS Ringkas - Tahun Ajaran 2025
                        </h1>
                    </div>

                    {/* TABEL */}
                    <div className="p-4">
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-300 text-sm">

                                {/* HEADER TABEL */}
                                <thead className="bg-violet-600 text-white">
                                    <tr>
                                        <th className="border border-gray-300 px-3 py-3 w-12">
                                            No
                                        </th>
                                        <th className="border border-gray-300 px-3 py-3 text-left">
                                            Kode Akun
                                        </th>
                                        <th className="border border-gray-300 px-3 py-3 text-left">
                                            Nama Akun
                                        </th>
                                        <th className="border border-gray-300 px-3 py-3">
                                            Total Realisasi
                                        </th>
                                        <th className="border border-gray-300 px-3 py-3">
                                            Saldo Awal
                                        </th>
                                        <th className="border border-gray-300 px-3 py-3">
                                            Saldo Berjalan
                                        </th>
                                        <th className="border border-gray-300 px-3 py-3">
                                            Proyeksi Akhir Tahun
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                     <tr className="bg-violet-100 font-bold">
                                        <td
                                            colSpan="7"
                                            className="border border-gray-300 px-3 py-2 text-left"
                                        >
                                            PENDAPATAN
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                    </tr>

                                    <tr className="bg-violet-50 font-semibold">
                                        <td
                                            colSpan="3"
                                            className="border border-gray-300 px-3 py-2 text-center"
                                        >
                                            TOTAL PENDAPATAN
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                    </tr>

                                    {/* BELANJA */}
                                    <tr className="bg-violet-100 font-bold">
                                        <td
                                            colSpan="7"
                                            className="border border-gray-300 px-3 py-2 text-left"
                                        >
                                            BELANJA
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                    </tr>

                                    <tr className="bg-violet-50 font-semibold">
                                        <td
                                            colSpan="3"
                                            className="border border-gray-300 px-3 py-2 text-center"
                                        >
                                            TOTAL BELANJA
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                        <td className="border border-gray-300 px-3 py-2"></td>
                                    </tr>

                                    {/* TOTAL */}
                                    <tr className="bg-violet-200 font-bold">
                                        <td
                                            colSpan="3"
                                            className="border border-gray-300 px-3 py-3 text-center"
                                        >
                                            TOTAL KESELURUHAN
                                        </td>
                                        <td className="border border-gray-300 px-3 py-3">0</td>
                                        <td className="border border-gray-300 px-3 py-3">0</td>
                                        <td className="border border-gray-300 px-3 py-3">0</td>
                                        <td className="border border-gray-300 px-3 py-3">0</td>
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

export default APBSInduk;