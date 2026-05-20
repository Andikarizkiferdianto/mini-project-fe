import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import {
    BookOpen,
    CheckCircle,
    List,
    Trash2
} from 'lucide-react';

import Swal from 'sweetalert2';
import axios from 'axios';

const PeminjamanBuku = () => {

    const [peminjaman, setPeminjaman] = useState([]);

    const [formData, setFormData] = useState({
        nis: '',
        buku_id: '',
        tgl_pinjam: new Date().toISOString().split('T')[0],
        tgl_kembali: '',
        jumlah: 1
    });

    const fetchPeminjaman = async () => {

        try {

            const res = await axios.get(
                "http://localhost:8000/api/peminjaman"
            );

            setPeminjaman(res.data.data || []);

        } catch (err) {

            console.error(err);

            setPeminjaman([]);
        }
    };

    useEffect(() => {
        fetchPeminjaman();
    }, []);

    const handleSimpan = async (e) => {

        e.preventDefault();

        Swal.fire({
            title: 'Menyimpan...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        try {

            const response = await axios.post(
                'http://localhost:8000/api/peminjaman',
                {
                    ...formData,
                    buku_id: formData.buku_id,
                    jumlah: parseInt(formData.jumlah)
                }
            );

            Swal.fire(
                "Berhasil!",
                response.data.message,
                "success"
            );

            setFormData({
                nis: '',
                buku_id: '',
                tgl_pinjam: new Date().toISOString().split('T')[0],
                tgl_kembali: '',
                jumlah: 1
            });

            fetchPeminjaman();

        } catch (error) {

            Swal.fire(
                "Gagal!",
                error.response?.data?.error || "Gagal simpan data",
                "error"
            );
        }
    };

    const handleDelete = (id) => {

        Swal.fire({
            title: "Yakin hapus?",
            text: "Stok buku akan kembali otomatis",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus"
        }).then(async (result) => {

            if (result.isConfirmed) {

                try {

                    const res = await axios.delete(
                        `http://localhost:8000/api/peminjaman/${id}`
                    );

                    Swal.fire(
                        "Berhasil!",
                        res.data.message,
                        "success"
                    );

                    fetchPeminjaman();

                } catch (err) {

                    Swal.fire(
                        "Gagal!",
                        "Gagal menghapus data",
                        "error"
                    );
                }
            }
        });
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-6 mt-15">

                <h1 className="text-xl font-bold text-emerald-700 flex items-center gap-2 mb-6">
                    <BookOpen size={24} />
                    Manajemen Peminjaman
                </h1>

                <div className="bg-white rounded-xl shadow p-6 mb-8 border-t-4 border-emerald-500">

                    <form
                        onSubmit={handleSimpan}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >

                        <div>
                            <label className="block text-sm font-bold mb-1">
                                NIS Siswa
                            </label>

                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2"
                                value={formData.nis}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        nis: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-1">
                                ID Buku / Barcode
                            </label>

                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2"
                                value={formData.buku_id}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        buku_id: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Jumlah
                            </label>

                            <input
                                type="number"
                                className="w-full border rounded-lg px-3 py-2"
                                min="1"
                                value={formData.jumlah}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        jumlah: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Tanggal Pinjam
                            </label>

                            <input
                                type="date"
                                className="w-full border rounded-lg px-3 py-2"
                                value={formData.tgl_pinjam}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        tgl_pinjam: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Tanggal Kembali
                            </label>

                            <input
                                type="date"
                                className="w-full border rounded-lg px-3 py-2"
                                value={formData.tgl_kembali}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        tgl_kembali: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="flex items-end">

                            <button
                                type="submit"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition w-full justify-center"
                            >
                                <CheckCircle size={18} />
                                Simpan Pinjam
                            </button>

                        </div>

                    </form>

                </div>

                <div className="bg-white rounded-xl shadow p-4">

                    <h2 className="font-semibold text-gray-700 flex items-center gap-2 mb-4">
                        <List size={20} />
                        Daftar Peminjaman
                    </h2>

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm border border-gray-200">

                            <thead className="bg-emerald-600 text-white">

                                <tr>
                                    <th className="p-3">No</th>
                                    <th className="p-3 text-left">Peminjam</th>
                                    <th className="p-3 text-left">Buku</th>
                                    <th className="p-3">Jumlah</th>
                                    <th className="p-3">Tgl Pinjam</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Aksi</th>
                                </tr>

                            </thead>

                            <tbody>

                                {peminjaman.map((p, index) => (

                                    <tr
                                        key={p.id}
                                        className="text-center border-t hover:bg-gray-50"
                                    >

                                        <td className="p-3">
                                            {index + 1}
                                        </td>

                                        <td className="p-3 text-left font-medium">
                                            {p.nama}
                                        </td>

                                        <td className="p-3 text-left">
                                            {p.buku}
                                        </td>

                                        <td className="p-3">
                                            {p.jumlah}
                                        </td>

                                        <td className="p-3">
                                            {p.tgl_pinjam}
                                        </td>

                                        <td className="p-3">

                                            <span className={`px-2 py-1 rounded-full text-xs text-white ${
                                                p.status === 'Dipinjam'
                                                    ? 'bg-orange-700'
                                                    : 'bg-green-700'
                                            }`}>
                                                {p.status}
                                            </span>

                                        </td>

                                        <td className="p-3">

                                            <div className="flex justify-center">

                                                <button
                                                    onClick={() =>
                                                        handleDelete(p.id)
                                                    }
                                                    className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-md"
                                                >
                                                    <Trash2 size={16} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PeminjamanBuku;