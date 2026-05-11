import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Swal from 'sweetalert2';

const BannerAplikasi = () => {
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
                <h1 className="text-2xl font-semibold text-gray-800">
                    Kelola Banner Aplikasi
                </h1>

                <div className="mb-4 mt-5">
                    <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded shadow transition font-medium">
                        Upload Banner Baru
                    </button>
                </div>

                 <div className="overflow-x-auto bg-white rounded-lg">
                    <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-violet-600 text-white ">
                            <tr>
                                <th className="p-3 font-bold w-12 text-center">No</th>
                                <th className="p-3 font-bold">Preview</th>
                                <th className="p-3 font-bold">Nama File</th>
                                <th className="p-3 font-bold w-32">Diunggah</th>
                                <th className="p-3 font-bold w-40 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {informasi.map((item, index) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-3 text-center">{index + 1}</td>
                                    <td className="p-3">{item.judul}</td>
                                    <td className="p-3">{item.isi}</td>
                                    <td className="p-3">{item.tanggal}</td>
                                    <td className="p-3 text-center space-x-2">
                                        
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

export default BannerAplikasi;
