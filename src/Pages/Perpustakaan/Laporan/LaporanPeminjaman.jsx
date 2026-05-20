// LaporanPeminjaman.jsx

import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import { BookOpen, Search } from 'lucide-react';
import axios from 'axios';

const LaporanPeminjaman = () => {

    const [loanData, setLoanData] = useState([]);
    const [search, setSearch] = useState("");

    const fetchData = async () => {

        try {

            const res = await axios.get(
                "http://localhost:8000/api/peminjaman"
            );

            const filtered = res.data.data.filter(
                (item) => item.status === "Dipinjam"
            );

            setLoanData(filtered);

        } catch (err) {

            console.error(err);

            setLoanData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = loanData.filter((item) =>
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.buku.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6 bg-gray-50 min-h-screen mt-16">

                <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">

                    <div className="bg-violet-500 p-3 flex items-center gap-2">
                        <BookOpen size={22} className="text-white" />
                        <h1 className="text-xl font-medium text-white">
                            Laporan Peminjaman Buku
                        </h1>
                    </div>

                    <div className="p-4">

                        <div className="flex justify-between items-center mb-4">

                            <div className="flex items-center gap-2">
                                <Search size={18} className="text-gray-500" />

                                <input
                                    type="text"
                                    placeholder="Cari nama / buku..."
                                    className="border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-400"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                        </div>

                        {filteredData.length === 0 ? (

                            <div className="w-full bg-cyan-100 border border-cyan-200 rounded-md p-4">
                                <p className="text-cyan-900">
                                    Belum ada data peminjaman.
                                </p>
                            </div>

                        ) : (

                          <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">

                                        <tr>

                                            <th className="p-3 text-center">
                                                No
                                            </th>

                                            <th className="p-3 text-left">
                                                Nama
                                            </th>

                                            <th className="p-3 text-left">
                                                NIS
                                            </th>

                                            <th className="p-3 text-left">
                                                Buku
                                            </th>

                                            <th className="p-3 text-center">
                                                Jumlah
                                            </th>

                                            <th className="p-3 text-center">
                                                Tgl Pinjam
                                            </th>

                                            <th className="p-3 text-center">
                                                Tgl Kembali
                                            </th>

                                            <th className="p-3 text-center">
                                                Status
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filteredData.map((item, index) => (

                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50"
                                            >

                                                <td className="p-3 text-center">
                                                    {index + 1}
                                                </td>

                                                <td className="p-3">
                                                    {item.nama}
                                                </td>

                                                <td className="p-3">
                                                    {item.nis}
                                                </td>

                                                <td className="p-3">
                                                    {item.buku}
                                                </td>

                                                <td className="p-3 text-center">
                                                    {item.jumlah}
                                                </td>

                                                <td className="p-3 text-center">
                                                    {item.tgl_pinjam}
                                                </td>

                                                <td className="p-3 text-center">
                                                    {item.tgl_kembali}
                                                </td>

                                                <td className="p-3 text-center">

                                                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">
                                                        {item.status}
                                                    </span>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default LaporanPeminjaman;