import React from "react";
import Sidebar from "../../components/Sidebar";
import {
    RiMapPin2Fill,
    RiAddLine,
    RiEdit2Fill,
    RiDeleteBin6Fill,
} from "react-icons/ri";

const SettingAbsensiGPS = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-4 mt-16 overflow-x-auto">

                 <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">

                     <div className="bg-violet-600 text-white px-4 py-3 flex items-center justify-between">

                        <div className="flex items-center gap-2 text-3xl">
                            <RiMapPin2Fill className="text-orange-400" />
                            <h1 className="text-2xl font-medium">
                                Lokasi Absensi
                            </h1>
                        </div>

                        <button
                            className="text-white px-4 py-2 rounded flex items-center gap-2 bg-green-500 hover:bg-green-600"
                        >
                            <RiAddLine />
                            Tambah Lokasi
                        </button>
                    </div>

                    {/* TABEL */}
                    <div className="p-4 overflow-x-auto ">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-3">
                                        No
                                    </th>

                                    <th className="border border-gray-300 px-4 py-3">
                                        Nama Lokasi
                                    </th>

                                    <th className="border border-gray-300 px-4 py-3">
                                        Latitude
                                    </th>

                                    <th className="border border-gray-300 px-4 py-3">
                                        Longitude
                                    </th>

                                    <th className="border border-gray-300 px-4 py-3">
                                        Radius
                                    </th>

                                    <th className="border border-gray-300 px-4 py-3">
                                        Jam Masuk
                                    </th>

                                    <th className="border border-gray-300 px-4 py-3">
                                        Jam Selesai
                                    </th>

                                    <th className="border border-gray-300 px-4 py-3">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                             <tbody>

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

export default SettingAbsensiGPS;