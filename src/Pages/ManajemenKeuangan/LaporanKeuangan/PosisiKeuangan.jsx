import React from "react";
import Sidebar from "../../../components/Sidebar";

const PosisiKeuangan = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                {/* title */}
                <h1 className="text-3xl font-semibold text-gray-800">
                    Laporan Posisi Keuangan (Neraca)
                </h1>

                {/* filter */}
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">

                    <div className="bg-violet-600 text-white px-4 py-3 font-semibold">
                        Filter Periode
                    </div>

                    <div className="p-4 bg-gray-50">

                        <div className="flex flex-wrap items-end gap-4">

                            {/* tanggal awal */}
                            <div className="flex-1 min-w-[250px]">
                                <label className="block text-sm mb-2 font-medium">
                                    Tanggal Awal
                                </label>

                                <input
                                    type="date"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>

                            {/* tanggal akhir */}
                            <div className="flex-1 min-w-[250px]">
                                <label className="block text-sm mb-2 font-medium">
                                    Tanggal Akhir
                                </label>

                                <input
                                    type="date"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>

                            {/* button tampilkan */}
                            <button className="bg-green-600 hover:bg-green-700 text-white px-20 py-2 rounded-md font-medium">
                                Tampilkan
                            </button>
                        </div>

                        {/* download */}
                        <div className="mt-4">
                            <button className="border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-6 py-2 rounded-md transition w-[240px]">
                                Download Laporan
                            </button>
                        </div>
                    </div>
                </div>

                {/* content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* aset */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

                        <div className="bg-sky-600 text-white px-4 py-3 font-semibold text-lg">
                            Aset
                        </div>

                        <div className="p-4 space-y-5">

                            {/* aset lancar */}
                            <div>
                                <h2 className="font-semibold text-xl mb-3">
                                    Aset Lancar
                                </h2>

                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="flex justify-between px-4 py-3 border border-gray-200">
                                        <span>Kas</span>
                                        <span>Rp 0</span>
                                    </div>

                                    <div className="flex justify-between px-4 py-3">
                                        <span>Kas di Bank</span>
                                        <span>Rp 0</span>
                                    </div>
                                </div>
                            </div>

                            {/* total */}
                            <div className="text-right font-semibold text-1xl">
                                Total Aset: Rp 0
                            </div>
                        </div>
                    </div>

                    {/* liabilitas */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

                        <div className="bg-yellow-600 text-white px-4 py-3 font-semibold text-lg">
                            Liabilitas & Ekuitas
                        </div>

                        <div className="p-4 space-y-5">

                            {/* liabilitas */}
                            <div>
                                <h2 className="font-semibold text-md mb-3">
                                    Liabilitas Jangka Pendek
                                </h2>

                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="flex justify-between px-4 py-3">
                                        <span>Utang Bank</span>
                                        <span>Rp 0</span>
                                    </div>
                                </div>
                            </div>

                            {/* laba */}
                            <div>
                                <h2 className="font-semibold text-md mb-3">
                                    Laba Tahun Berjalan
                                </h2>

                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="flex justify-between px-4 py-3">
                                        <span>Laba Bersih</span>
                                        <span>Rp 0</span>
                                    </div>
                                </div>
                            </div>

                            {/* total */}
                            <div className="text-right font-semibold text-1xl">
                                Total Liabilitas & Ekuitas: Rp -66
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PosisiKeuangan;