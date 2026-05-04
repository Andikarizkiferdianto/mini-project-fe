import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import Swal from 'sweetalert2';

const DataBuku = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    // State untuk Modal & Form
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        judul_buku: '', penulis: '', penerbit: '', tahun: 2026,
        isbn: '', barcode: '', kategori: '', rak: '', stok: 0, harga: 0, kondisi: 'Baik'
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/buku');
            setBooks(response.data);
        } catch (error) {
            Swal.fire('Error', 'Gagal mengambil data dari server', 'error');
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Siapkan data dengan default value agar backend tidak KeyError
    const dataToSend = {
        judul_buku: formData.judul_buku,
        penulis: formData.penulis,
        penerbit: formData.penerbit || "Erlangga", // Pastikan ada isinya
        tahun: parseInt(formData.tahun) || 2026,
        isbn: formData.isbn,
        barcode: formData.barcode || "", // Backend lo udah ada logic generate kalau kosong
        harga: parseFloat(formData.harga) || 0,
        kondisi: formData.kondisi || "Baik",
        kategori: formData.kategori || "Umum",
        rak: formData.rak || "Belum ditentukan",
        stok: parseInt(formData.stok) || 0
    };

    try {
        const response = await axios.post('http://localhost:8000/api/buku', dataToSend);
        
        if (response.status === 201) {
            Swal.fire('Berhasil!', 'Buku baru telah ditambahkan.', 'success');
            setIsModalOpen(false);
            setFormData({ 
                judul_buku: '', penulis: '', penerbit: '', tahun: 2026, 
                isbn: '', barcode: '', kategori: '', rak: '', stok: 0, harga: 0, kondisi: 'Baik' 
            });
            fetchBooks();
        }
    } catch (error) {
        const errorMsg = error.response?.data?.error || "Cek koneksi backend";
        console.error("Backend Error:", errorMsg);
        Swal.fire('Gagal', `Error: ${errorMsg}`, 'error');
    }
};

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Buku?',
            text: "Data yang dihapus nggak bisa balik lagi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8000/api/buku/${id}`);
                    Swal.fire('Terhapus!', 'Buku berhasil dihapus.', 'success');
                    fetchBooks();
                } catch (error) {
                    Swal.fire('Gagal', 'Gagal menghapus data buku', 'error');
                }
            }
        });
    };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        try {
            const response = await axios.get(`http://localhost:8000/api/buku?search=${value}`);
            setBooks(response.data);
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            
            <div className="flex-1 p-6 bg-gray-50 min-h-screen mt-16">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-600">Data Buku</h1>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
                        >
                            <Plus size={18} /> Tambah Buku
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="bg-blue-600 p-3 text-white font-semibold">
                        Daftar Buku
                    </div>
                    
                    <div className="p-4 flex justify-between items-center border-b">
                        <div className="flex gap-1">
                            <button className="border px-3 py-1 text-sm rounded hover:bg-gray-100">Copy</button>
                            <button className="border px-3 py-1 text-sm rounded hover:bg-gray-100">Excel</button>
                            <button className="border px-3 py-1 text-sm rounded hover:bg-gray-100">PDF</button>
                        </div>

                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Cari judul atau barcode..." 
                                className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none w-64"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="p-3 font-semibold text-center">No</th>
                                    <th className="p-3 font-semibold">Judul Buku</th>
                                    <th className="p-3 font-semibold">Penulis</th>
                                    <th className="p-3 font-semibold text-center">Tahun</th>
                                    <th className="p-3 font-semibold">Barcode</th>
                                    <th className="p-3 font-semibold">Kategori</th>
                                    <th className="p-3 font-semibold">Rak</th>
                                    <th className="p-3 font-semibold text-center">Stok</th>
                                    <th className="p-3 font-semibold text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.length > 0 ? books.map((book, index) => (
                                    <tr key={book.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 text-center">{index + 1}</td>
                                        <td className="p-3 font-medium text-blue-600">{book.judul_buku}</td>
                                        <td className="p-3">{book.penulis}</td>
                                        <td className="p-3 text-center">{book.tahun}</td>
                                        <td className="p-3 font-mono text-xs">{book.barcode}</td>
                                        <td className="p-3">{book.kategori}</td>
                                        <td className="p-3">{book.rak}</td>
                                        <td className="p-3 text-center font-bold">{book.stok}</td>
                                        <td className="p-3">
                                            <div className="flex justify-center gap-2">
                                                <button className="bg-amber-400 p-1.5 rounded text-white hover:bg-amber-500 transition">
                                                    <Edit size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(book.id)}
                                                    className="bg-red-500 p-1.5 rounded text-white hover:bg-red-600 transition"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="9" className="p-6 text-center text-gray-500 italic">
                                            Data buku tidak ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* MODAL TAMBAH BUKU */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
                            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                                <h2 className="text-lg font-bold text-blue-600">Form Tambah Buku</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Judul Buku</label>
                                        <input required type="text" className="w-full border p-2 rounded outline-none focus:border-blue-500" onChange={(e) => setFormData({...formData, judul_buku: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Penulis</label>
                                        <input required type="text" className="w-full border p-2 rounded outline-none focus:border-blue-500" onChange={(e) => setFormData({...formData, penulis: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Tahun</label>
                                        <input required type="number" className="w-full border p-2 rounded outline-none focus:border-blue-500" placeholder="2026" onChange={(e) => setFormData({...formData, tahun: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Kategori</label>
                                        <input type="text" className="w-full border p-2 rounded outline-none focus:border-blue-500" onChange={(e) => setFormData({...formData, kategori: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Rak</label>
                                        <input type="text" className="w-full border p-2 rounded outline-none focus:border-blue-500" onChange={(e) => setFormData({...formData, rak: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Stok</label>
                                        <input type="number" className="w-full border p-2 rounded outline-none focus:border-blue-500" onChange={(e) => setFormData({...formData, stok: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">ISBN</label>
                                        <input type="text" className="w-full border p-2 rounded outline-none focus:border-blue-500" onChange={(e) => setFormData({...formData, isbn: e.target.value})} />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-6">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 transition">Batal</button>
                                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold">Simpan Data</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataBuku;