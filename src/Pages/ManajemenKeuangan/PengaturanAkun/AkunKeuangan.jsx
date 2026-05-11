import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../../../components/Sidebar";


const AkunKeuangan = () => {

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6 overflow-x-auto">

                {/* HEADER PAGE */}
                <div className="flex items-center gap-2 text-gray-800">
                    <h2 className="text-2xl font-semibold">
                        Data Akun Keuangan
                    </h2>
                </div>

                {/* CARD */}
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">

                    {/* HEADER CARD */}
                    <div className="flex justify-between items-center border-b border-gray-300 px-4 py-3 bg-gray-50">

                        <div className="flex items-center gap-2">
 
                            <h2 className="text-xl font-medium text-gray-800">
                                Daftar Akun Keuangan          
                            </h2>
                        </div>

                        <button
                            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded flex items-center gap-2"
                        >
                           + Tambah
                        </button>
                    </div>

                    {/* TABEL */}
                    <div className="p-4 overflow-x-auto">

                        <table className="w-full border border-gray-300 text-sm">

                            {/* HEADER */}
                            <thead className="bg-violet-600 text-white">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-3">
                                        No
                                    </th>

                                    <th className="border border-gray-300 px-4 py-3">
                                        Kode Akun
                                    </th>

                                    <th className="border border-gray-300 px-4 py-3">
                                        Nama Akun
                                    </th>

                                    <th className="border border-gray-300 px-4 py-3">
                                        Kelompok
                                    </th>

                                    <th className="border border-gray-300 px-4 py-3">
                                        Golongan
                                    </th>

                                    <th className="border border-gray-300 px-4 py-3">
                                        Keterangan
                                    </th>

                                    <th className="border border-gray-300 px-4 py-3">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            {/* BODY */}
                            <tbody>

                                {/* ROW KOSONG */}
                                <tr>
                                    
                                </tr>

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AkunKeuangan;