import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Swal from 'sweetalert2';

const InformasiLembaga = () => {
    const [informasi, setInformasi] = useState([
        { id: 1, judul: "Informasi Maintenance Sistem", isi: "Sedang ada informasi maintenance sistem", tanggal: "22-09-2025" },
        { id: 2, judul: "Selamat datang di aplikasi sekolah", isi: "Silahkan hubungi kami jika ada masalah", tanggal: "31-07-2025" }
    ]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Yakin mau hapus?",
            text: "Data yang dihapus nggak bisa dibalikin lagi lho!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal"
        }).then((result) => {
            if (result.isConfirmed) {
                setInformasi(informasi.filter(item => item.id !== id));
                Swal.fire("Terhapus!", "Data informasi berhasil dihapus.", "success");
            }
        });
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-8 mt-12">
                <div className="mb-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition font-medium">
                        Tambah Informasi
                    </button>
                </div>

                <div className="bg-white rounded-sm shadow border overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-3 border-r font-bold text-gray-700 w-12 text-center">#</th>
                                <th className="p-3 border-r font-bold text-gray-700">Judul</th>
                                <th className="p-3 border-r font-bold text-gray-700">Isi</th>
                                <th className="p-3 border-r font-bold text-gray-700 w-32">Tanggal</th>
                                <th className="p-3 font-bold text-gray-700 w-40 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {informasi.map((item, index) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-3 border-r text-center">{index + 1}</td>
                                    <td className="p-3 border-r">{item.judul}</td>
                                    <td className="p-3 border-r">{item.isi}</td>
                                    <td className="p-3 border-r">{item.tanggal}</td>
                                    <td className="p-3 text-center space-x-2">
                                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition shadow-sm">
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition shadow-sm">
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {informasi.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center text-gray-500 italic">
                                        Belum ada data informasi.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default InformasiLembaga;
