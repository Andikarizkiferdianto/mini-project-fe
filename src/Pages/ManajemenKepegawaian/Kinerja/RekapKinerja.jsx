import React from 'react';
import Sidebar from '../../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';

const RekapKinerja = () => {
    const dataGuru = [
        {
            no: 1,
            nama: "-",
            kehadiran: "-",
            kedisiplinan: "-",
            prestasi: "-",
            kepemimpinan: "-",
            literasi: "-",
            keterampilan: "-",
            rata: "-"
        },
     
    ];

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-4 mt-12">

                <div className="bg-white rounded-lg border border-gray-300 overflow-hidden mt-5">

                    <div className="bg-green-700 px-4 py-3 flex justify-between items-center">
                        <h1 className="text-white font-bold text-xl">
                            Rekap Kinerja Guru
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

                    {/* ACTION */}
                    <div className="flex justify-between items-center px-3 py-4">
                        <div className="flex gap-1">
                            {["Copy", "CSV", "Excel", "PDF", "Print"].map((btn) => (
                                <button
                                    key={btn}
                                    className="border border-gray-300 bg-white px-4 py-2 text-xs hover:bg-gray-100"
                                >
                                    {btn}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-sm">Search:</label>
                            <input
                                type="text"
                                className="border border-gray-300 px-2 py-1 text-sm"
                            />
                        </div>
                    </div>

                    {/* TABLE */}
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-green-100">
                                <th
                                    rowSpan="2"
                                    className="border border-gray-300 px-2 py-2 text-left"
                                >
                                    No
                                </th>

                                <th
                                    rowSpan="2"
                                    className="border border-gray-300 px-2 py-2 text-left w-72"
                                >
                                    Nama Guru
                                </th>

                                <th
                                    colSpan="6"
                                    className="border border-gray-300 px-2 py-2 text-center"
                                >
                                    Indikator Kinerja
                                </th>

                                <th
                                    rowSpan="2"
                                    className="border border-gray-300 px-2 py-2 text-left"
                                >
                                    Rata-rata
                                </th>
                            </tr>

                            <tr className="bg-green-100">
                                <th className="border border-gray-300 px-2 py-2">
                                    Kehadiran
                                </th>

                                <th className="border border-gray-300 px-2 py-2">
                                    Kedisiplinan
                                </th>

                                <th className="border border-gray-300 px-2 py-2">
                                    Prestasi
                                </th>

                                <th className="border border-gray-300 px-2 py-2">
                                    Kepemimpinan
                                </th>

                                <th className="border border-gray-300 px-2 py-2">
                                    Literasi Digital
                                </th>

                                <th className="border border-gray-300 px-2 py-2">
                                    Keterampilan
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataGuru.map((item) => (
                                <tr
                                    key={item.no}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="border border-gray-300 px-3 py-2 text-center">
                                        {item.no}
                                    </td>

                                    <td className="border border-gray-300 px-3 py-2">
                                        {item.nama}
                                    </td>

                                    <td className="border border-gray-300 px-3 py-2 text-center">
                                        {item.kehadiran || "-"}
                                    </td>

                                    <td className="border border-gray-300 px-3 py-2 text-center">
                                        {item.kedisiplinan || "-"}
                                    </td>

                                    <td className="border border-gray-300 px-3 py-2 text-center">
                                        {item.prestasi || "-"}
                                    </td>

                                    <td className="border border-gray-300 px-3 py-2 text-center">
                                        {item.kepemimpinan || "-"}
                                    </td>

                                    <td className="border border-gray-300 px-3 py-2 text-center">
                                        {item.literasi || "-"}
                                    </td>

                                    <td className="border border-gray-300 px-3 py-2 text-center">
                                        {item.keterampilan || "-"}
                                    </td>

                                    <td className="border border-gray-300 px-3 py-2 text-center font-semibold">
                                        {item.rata || "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* FOOTER */}
                    <div className="flex justify-between items-center px-2 py-3 text-sm">
                        <p>Showing 1 to 1 entries</p>

                        <div className="flex items-center gap-2">
                            <button className="px-2 py-1 hover:bg-gray-100">
                                Previous
                            </button>

                            <button className="border border-gray-300 px-3 py-1 bg-gray-100">
                                1
                            </button>
 
                            <button className="px-2 py-1 hover:bg-gray-100">
                                Next
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RekapKinerja;