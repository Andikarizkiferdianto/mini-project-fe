import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import { Plus, Edit, Trash2, Search, X, Copy, FileText, FileSpreadsheet, Printer } from 'lucide-react';

const LaporanBuku = () => {
     const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex">
            <Sidebar />
            
            <div className="flex-1 p-6 bg-gray-50 min-h-screen mt-16">
                 <div className="bg-green-700 p-3 rounded-t-lg flex items-center gap-2">
                    <div className="bg-white p-1 rounded">
                        <Search size={16} className="text-green-700" />
                    </div>
                    <h1 className="text-lg font-semibold text-white">Laporan Stok Buku Saat Ini</h1>
                </div>

                <div className="bg-white rounded-b-lg shadow-sm border overflow-hidden p-4">
                     <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-1">
                            <button className="border px-4 py-1.5 text-sm rounded bg-gray-50 hover:bg-gray-100 flex items-center gap-1">Copy</button>
                            <button className="border px-4 py-1.5 text-sm rounded bg-gray-50 hover:bg-gray-100 flex items-center gap-1">CSV</button>
                            <button className="border px-4 py-1.5 text-sm rounded bg-gray-50 hover:bg-gray-100 flex items-center gap-1">Excel</button>
                            <button className="border px-4 py-1.5 text-sm rounded bg-gray-50 hover:bg-gray-100 flex items-center gap-1">PDF</button>
                            <button className="border px-4 py-1.5 text-sm rounded bg-gray-50 hover:bg-gray-100 flex items-center gap-1">Print</button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm">Search:</span>
                            <input 
                                type="text" 
                                className="border rounded px-2 py-1 outline-none focus:ring-1 focus:ring-green-500 w-48"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

{/* tabel  */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse border">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="p-2 border font-bold w-12 text-center">No</th>
                                    <th className="p-2 border font-bold">Judul Buku</th>
                                    <th className="p-2 border font-bold">ISBN</th>
                                    <th className="p-2 border font-bold">Penulis</th>
                                    <th className="p-2 border font-bold">Tahun</th>
                                    <th className="p-2 border font-bold">Kategori</th>
                                    <th className="p-2 border font-bold text-center">Stok Total</th>
                                    <th className="p-2 border font-bold text-center">Dipinjam</th>
                                    <th className="p-2 border font-bold text-center">Tersedia</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.length > 0 ? (
                                    books.map((book, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="p-2 border text-center">{index + 1}</td>
                                            <td className="p-2 border text-blue-600">{book.judul}</td>
                                            <td className="p-2 border">{book.isbn}</td>
                                            <td className="p-2 border">{book.penulis}</td>
                                            <td className="p-2 border">{book.tahun}</td>
                                            <td className="p-2 border">{book.kategori}</td>
                                            <td className="p-2 border text-center font-semibold">{book.stok}</td>
                                            <td className="p-2 border text-center">0</td>
                                            <td className="p-2 border text-center text-green-700 font-bold">{book.stok}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="p-4 text-center text-gray-400 italic">
                                            Tidak ada data tersedia di tabel ini
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Tabel */}
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                        <div>Showing 0 to 0 of 0 entries</div>
                        <div className="flex gap-1">
                            <button className="px-3 py-1 border rounded bg-gray-50 disabled:opacity-50">Previous</button>
                            <button className="px-3 py-1 border rounded bg-green-700 text-white">1</button>
                            <button className="px-3 py-1 border rounded bg-gray-50 disabled:opacity-50">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaporanBuku;