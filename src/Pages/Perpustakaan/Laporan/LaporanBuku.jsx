import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import {
    Search,
    Copy,
    FileText,
    FileSpreadsheet,
    Printer
} from 'lucide-react';

import axios from 'axios';

const LaporanBuku = () => {

    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchBooks = async () => {

        try {

            const res = await axios.get(
                `http://localhost:8000/api/buku?search=${searchTerm}`
            );

            setBooks(res.data || []);

        } catch (err) {

            console.error(err);

            setBooks([]);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [searchTerm]);

    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 p-6 bg-gray-50 min-h-screen mt-16">

                <div className="bg-green-700 p-3 rounded-t-lg flex items-center gap-2">

                    <div className="bg-white p-1 rounded">
                        <Search size={16} className="text-green-700" />
                    </div>

                    <h1 className="text-lg font-semibold text-white">
                        Laporan Stok Buku Saat Ini
                    </h1>

                </div>

                <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 overflow-hidden p-4">

                    <div className="flex justify-between items-center mb-4">

                        <div className="flex gap-1">

                            <button className="border px-4 py-1.5 text-sm rounded bg-gray-50 hover:bg-gray-100 flex items-center gap-1">
                                <Copy size={16} />
                                Copy
                            </button>

                            <button className="border px-4 py-1.5 text-sm rounded bg-gray-50 hover:bg-gray-100 flex items-center gap-1">
                                <FileText size={16} />
                                CSV
                            </button>

                            <button className="border px-4 py-1.5 text-sm rounded bg-gray-50 hover:bg-gray-100 flex items-center gap-1">
                                <FileSpreadsheet size={16} />
                                Excel
                            </button>

                            <button className="border px-4 py-1.5 text-sm rounded bg-gray-50 hover:bg-gray-100 flex items-center gap-1">
                                <FileText size={16} />
                                PDF
                            </button>

                            <button className="border px-4 py-1.5 text-sm rounded bg-gray-50 hover:bg-gray-100 flex items-center gap-1">
                                <Printer size={16} />
                                Print
                            </button>

                        </div>

                        <div className="flex items-center gap-2">

                            <span className="text-sm">
                                Search:
                            </span>

                            <input
                                type="text"
                                className="border rounded px-2 py-1 outline-none focus:ring-1 focus:ring-green-500 w-48"
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    {/* tabel */}

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr >

                                    <th className="p-2 font-bold w-12 text-center">
                                        No
                                    </th>

                                    <th className="p-2 font-bold">
                                        Judul Buku
                                    </th>

                                    <th className="p-2 font-bold">
                                        ISBN
                                    </th>

                                    <th className="p-2 font-bold">
                                        Penulis
                                    </th>

                                    <th className="p-2 font-bold">
                                        Tahun
                                    </th>

                                    <th className="p-2 font-bold">
                                        Kategori
                                    </th>

                                    <th className="p-2 font-bold text-center">
                                        Stok Total
                                    </th>

                                    <th className="p-2 font-bold text-center">
                                        Barcode
                                    </th>

                                    <th className="p-2 font-bold text-center">
                                        Kondisi
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {books.length > 0 ? (

                                    books.map((book, index) => (

                                        <tr
                                            key={book.id}
                                            className="hover:bg-gray-50"
                                        >

                                            <td className="p-2 text-center">
                                                {index + 1}
                                            </td>

                                            <td className="p-2">
                                                {book.judul_buku}
                                            </td>

                                            <td className="p-2">
                                                {book.isbn}
                                            </td>

                                            <td className="p-2">
                                                {book.penulis}
                                            </td>

                                            <td className="p-2">
                                                {book.tahun}
                                            </td>

                                            <td className="p-2">
                                                {book.kategori}
                                            </td>

                                            <td className="p-2 text-center font-semibold">
                                                {book.stok}
                                            </td>

                                            <td className="p-2 text-center">
                                                {book.barcode}
                                            </td>

                                            <td className="p-2 text-center">

                                                <span className={`px-2 py-1 rounded text-white text-xs ${book.kondisi === "Baik"
                                                    ? "bg-green-600"
                                                    : "bg-red-500"
                                                    }`}>

                                                    {book.kondisi}

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="9"
                                            className="p-4 text-center text-gray-400 italic"
                                        >
                                            Tidak ada data tersedia di tabel ini
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* Footer */}

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">

                        <div>
                            Showing {books.length} entries
                        </div>

                        <div className="flex gap-1">

                            <button className="px-3 py-1 border rounded bg-gray-50">
                                Previous
                            </button>

                            <button className="px-3 py-1 border rounded bg-gray-500 text-white">
                                1
                            </button>

                            <button className="px-3 py-1 border rounded bg-gray-50">
                                Next
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default LaporanBuku;