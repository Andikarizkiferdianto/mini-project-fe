import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:8000/api/informasi-lembaga';

const InformasiLembaga = () => {

    const [informasi, setInformasi] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [formData, setFormData] = useState({
        judul: '',
        isi: '',
        tanggal: ''
    });

   
    const fetchInformasi = async () => {

        try {

            const response = await fetch(BASE_URL);

            const result = await response.json();

            if (result.status === 'success') {
                setInformasi(result.data);
            }

        } catch (error) {

            console.log(error);

            Swal.fire(
                'Error',
                'Gagal mengambil data informasi',
                'error'
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInformasi();
    }, []);

     
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

  
    const handleTambah = async () => {

        if (
            !formData.judul ||
            !formData.isi ||
            !formData.tanggal
        ) {

            Swal.fire(
                'Warning',
                'Semua field wajib diisi',
                'warning'
            );

            return;
        }

        try {

            const response = await fetch(BASE_URL, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.status === 'success') {

                Swal.fire(
                    'Berhasil',
                    'Informasi berhasil ditambahkan',
                    'success'
                );

                setFormData({
                    judul: '',
                    isi: '',
                    tanggal: ''
                });

                setShowModal(false);

                fetchInformasi();

            } else {

                Swal.fire(
                    'Error',
                    result.message,
                    'error'
                );
            }

        } catch (error) {

            console.log(error);

            Swal.fire(
                'Error',
                'Gagal menambahkan data',
                'error'
            );
        }
    };

    
    const handleEdit = (item) => {

        setIsEdit(true);

        setSelectedId(item.id);

        setFormData({
            judul: item.judul,
            isi: item.isi,
            tanggal: item.tanggal
        });

        setShowModal(true);
    };
 
    const handleUpdate = async () => {

        if (
            !formData.judul ||
            !formData.isi ||
            !formData.tanggal
        ) {

            Swal.fire(
                'Warning',
                'Semua field wajib diisi',
                'warning'
            );

            return;
        }

        try {

            const response = await fetch(
                `${BASE_URL}/${selectedId}`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(formData)
                }
            );

            const result = await response.json();

            if (result.status === 'success') {

                Swal.fire(
                    'Berhasil',
                    'Informasi berhasil diupdate',
                    'success'
                );

                setFormData({
                    judul: '',
                    isi: '',
                    tanggal: ''
                });

                setIsEdit(false);

                setSelectedId(null);

                setShowModal(false);

                fetchInformasi();

            } else {

                Swal.fire(
                    'Error',
                    result.message,
                    'error'
                );
            }

        } catch (error) {

            console.log(error);

            Swal.fire(
                'Error',
                'Gagal update data',
                'error'
            );
        }
    };

   
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
        }).then(async (result) => {

            if (result.isConfirmed) {

                try {

                    const response = await fetch(
                        `${BASE_URL}/${id}`,
                        {
                            method: 'DELETE'
                        }
                    );

                    const res = await response.json();

                    if (res.status === 'success') {

                        Swal.fire(
                            "Terhapus!",
                            "Data informasi berhasil dihapus.",
                            "success"
                        );

                        fetchInformasi();

                    } else {

                        Swal.fire(
                            'Error',
                            res.message,
                            'error'
                        );
                    }

                } catch (error) {

                    console.log(error);

                    Swal.fire(
                        'Error',
                        'Gagal menghapus data',
                        'error'
                    );
                }
            }
        });
    };

    return (
        <>
            <div className="flex bg-gray-50 min-h-screen">

                <Sidebar />

                <div className="flex-1 p-8 mt-12">

                     <div className="mb-4">

                        <button
                            onClick={() => {

                                setIsEdit(false);

                                setFormData({
                                    judul: '',
                                    isi: '',
                                    tanggal: ''
                                });

                                setShowModal(true);
                            }}
                            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded shadow"
                        >
                            Tambah Informasi
                        </button>

                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto bg-white rounded-lg">

                        <table className="w-full text-sm border border-gray-200">

                            <thead className="bg-violet-600 text-white">
                                <tr>

                                    <th className="p-3">No</th>
                                    <th className="p-3">Judul</th>
                                    <th className="p-3">Isi</th>
                                    <th className="p-3">Tanggal</th>
                                    <th className="p-3">Aksi</th>

                                </tr>
                            </thead>

                            <tbody>

                                {loading ? (

                                    <tr>
                                        <td colSpan="5" className="p-5 text-center">
                                            Loading...
                                        </td>
                                    </tr>

                                ) : informasi.length > 0 ? (

                                    informasi.map((item, index) => (

                                        <tr
                                            key={item.id}
                                            className="border-b border-gray-200"
                                        >

                                            <td className="p-3 text-center">
                                                {index + 1}
                                            </td>

                                            <td className="p-3">
                                                {item.judul}
                                            </td>

                                            <td className="p-3">
                                                {item.isi}
                                            </td>

                                            <td className="p-3">
                                                {item.tanggal}
                                            </td>

                                            <td className="p-3 text-center space-x-2">

                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                >
                                                    Hapus
                                                </button>

                                            </td>

                                        </tr>
                                    ))

                                ) : (

                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="p-4 text-center"
                                        >
                                            Belum ada data
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* MODAL */}
            {showModal && (

                <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">

                    <div className="bg-white w-[500px] rounded-lg shadow-lg overflow-hidden">

                        {/* HEADER */}
                        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">

                            <h2 className="text-xl font-semibold">
                                {isEdit ? 'Edit Informasi' : 'Tambah Informasi'}
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-2xl text-gray-500"
                            >
                                ×
                            </button>

                        </div>

                        {/* BODY */}
                        <div className="p-6 space-y-4">

                            <div>

                                <label className="block mb-1">
                                    Judul
                                </label>

                                <input
                                    type="text"
                                    name="judul"
                                    value={formData.judul}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                />

                            </div>

                            <div>

                                <label className="block mb-1">
                                    Isi
                                </label>

                                <textarea
                                    name="isi"
                                    rows="5"
                                    value={formData.isi}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                ></textarea>

                            </div>

                            <div>

                                <label className="block mb-1">
                                    Tanggal
                                </label>

                                <input
                                    type="date"
                                    name="tanggal"
                                    value={formData.tanggal}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded px-3 py-2"
                                />

                            </div>

                        </div>

                        {/* FOOTER */}
                        <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">

                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Batal
                            </button>

                            <button
                                onClick={isEdit ? handleUpdate : handleTambah}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                            >
                                {isEdit ? 'Update' : 'Simpan'}
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
};

export default InformasiLembaga;