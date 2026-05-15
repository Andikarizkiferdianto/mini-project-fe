import React from 'react';
import Sidebar from '../../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';

const InputNilaiKerja = () => {
    const dataGuru = Array.from({ length: 1 }, (_, i) => ({
        no: i + 1,
    }));

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-4 mt-12">

                <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden mt-5">

                    {/* HEADER */}
                    <div className="bg-violet-600  px-3 py-2 flex justify-between items-center">
                        <h1 className="text-white font-bold text-xl">
                            Kinerja Guru
                        </h1>

                        <div className="flex flex-col gap-2 w-75">
                            <select className="border bg-white rounded px-3 py-2 text-sm">
                                <option>Guru</option>
                            </select>

                            <select className="border bg-white rounded px-3 py-2 text-sm">
                                <option>May</option>
                            </select>

                            <select className="border bg-white rounded px-3 py-2 text-sm">
                                <option>2026</option>
                            </select>
                        </div>
                    </div>

                    {/* TABLE */}
                    <table className="w-full border-collapse text-base">
                        <thead>
                            <tr className="bg-violet-300">
                                <th
                                    rowSpan="2"
                                    className="border border-gray-300 px-3 py-3 w-14"
                                >
                                    No
                                </th>

                                <th
                                    rowSpan="2"
                                    className="border border-gray-300 px-3 py-3 w-72"
                                >
                                    Nama Guru
                                </th>

                                <th
                                    colSpan="6"
                                    className="border border-gray-300 px-3 py-3 text-center"
                                >
                                    Indikator Kinerja
                                </th>

                                <th
                                    rowSpan="2"
                                    className="border border-gray-300 px-3 py-3 w-36"
                                >
                                    Aksi
                                </th>
                            </tr>

                            <tr className="bg-violet-300">
                                <th className="border border-gray-300 px-3 py-3">
                                    Kehadiran
                                </th>

                                <th className="border border-gray-300 px-3 py-3">
                                    Kedisiplinan
                                </th>

                                <th className="border border-gray-300 px-3 py-3">
                                    Prestasi
                                </th>

                                <th className="border border-gray-300 px-3 py-3">
                                    Kepemimpinan
                                </th>

                                <th className="border border-gray-300 px-3 py-3">
                                    Literasi Digital
                                </th>

                                <th className="border border-gray-300 px-3 py-3">
                                    Keterampilan
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataGuru.map((item) => (
                                <tr key={item.no}>
                                    <td className="border border-gray-300 px-3 py-2 text-center">
                                        {item.no}
                                    </td>

                                    <td className="border border-gray-300 px-3 py-2">
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                        />
                                    </td>

                                    {[1, 2, 3, 4, 5, 6].map((field) => (
                                        <td
                                            key={field}
                                            className="border border-gray-300 px-2 py-2"
                                        >
                                            <input
                                                type="number"
                                                className="w-full border border-gray-300 rounded px-3 py-2"
                                            />
                                        </td>
                                    ))}

                                    <td className="border border-gray-300 px-2 py-2 text-center">
                                        <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded flex items-center justify-center gap-2 mx-auto">
                                            <i className="ri-save-fill"></i>
                                            Simpan
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default InputNilaiKerja;