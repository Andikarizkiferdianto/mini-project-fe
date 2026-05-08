import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../../../components/Sidebar";


const SettingPagu = () => {

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6 overflow-x-auto">
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                    <div className="flex justify-between border-b border-gray-300 px-4 py-3">
                        <h1 className="font-semibold text-lg">
                            Daftar Pagu APBS
                        </h1>
                        <button
                            className=" bg-violet-600 text-white px-4 py-2 rounded"
                        >
                            + Tambah Pagu
                        </button>
                    </div>

                    <div className="flex justify-end mt-5">

                    </div>

                    {/* tabel */}
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-violet-600 text-white">
                                    <tr>
                                        <th className="p-3">No</th>
                                        <th className="p-3 text-left">Kode Akun</th>
                                        <th className="p-3">Nama Akun</th>
                                        <th className="p-3">Tahun</th>
                                        <th className="text-right p-3">Nominal</th>
                                        <th className="p-3">Aksi</th>
                                    </tr>
                                </thead>

                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default SettingPagu;