import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import Swal from 'sweetalert2';
import 'remixicon/fonts/remixicon.css';

const Cuti = () => {
    const [dataCuti, setDataCuti] = useState([]);
    const [dataPegawai, setDataPegawai] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [filterPegawai, setFilterPegawai] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [formData, setFormData] = useState({
        id_guru_pegawai: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        alasan: ''
    });

    const fetchCuti = async () => {
    try {

        let url = 'http://localhost:8000/api/manajemen-cuti';

        const query = [];

        if (filterPegawai) {
            query.push(`id_pegawai=${filterPegawai}`);
        }

        if (filterStatus) {
            query.push(`status=${filterStatus}`);
        }

        if (query.length > 0) {
            url += `?${query.join('&')}`;
        }

        const response = await fetch(url);

        const result = await response.json();

        if (result.status === 'success') {
            setDataCuti(result.data);
        }

    } catch (error) {
        console.error(error);
    }
};

    const fetchPegawai = async () => {
        try {
            const response = await fetch(
                'http://localhost:8000/api/data-guru-dan-karyawan'
            );

            const result = await response.json();

            if (result.status === 'success') {
                setDataPegawai(result.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

useEffect(() => {
    fetchPegawai();
}, []);

useEffect(() => {
    fetchCuti();
}, [filterPegawai, filterStatus]);

    const closeModal = () => {
        setShowModal(false);
        setEditData(null);

        setFormData({
            id_guru_pegawai: '',
            tanggal_mulai: '',
            tanggal_selesai: '',
            alasan: ''
        });
    };

    const handleSave = async () => {
        if (
            !formData.id_guru_pegawai ||
            !formData.tanggal_mulai ||
            !formData.tanggal_selesai
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Mohon lengkapi data yang wajib diisi!'
            });

            return;
        }

        const url = editData
            ? `http://localhost:8000/api/manajemen-cuti/${editData.id}`
            : 'http://localhost:8000/api/manajemen-cuti';

        const response = await fetch(url, {
            method: editData ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {

            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: editData
                    ? 'Data berhasil diperbarui!'
                    : 'Pengajuan berhasil dikirim!',
                timer: 1500,
                showConfirmButton: false
            });

            closeModal();
            fetchCuti();

        } else {

            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Terjadi kesalahan, silakan coba lagi.'
            });

        }
    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({
            title: 'Hapus Data?',
            text: 'Data yang dihapus tidak bisa dikembalikan.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7c3aed',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal'
        });

        if (result.isConfirmed) {

            const response = await fetch(
                `http://localhost:8000/api/manajemen-cuti/${id}`,
                {
                    method: 'DELETE'
                }
            );

            if (response.ok) {

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data berhasil dihapus.',
                    timer: 1500,
                    showConfirmButton: false
                });

                fetchCuti();
            }
        }
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 mt-10">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm">

                    {/* HEADER */}
                    <div className="flex bg-violet-600 justify-between items-center p-5 rounded-t-xl">
                        <h1 className="text-xl text-white font-semibold tracking-wide">
                            Manajemen Cuti
                        </h1>

                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm"
                        >
                            <i className="ri-add-line"></i>
                            Ajukan Cuti
                        </button>
                    </div>

                    <div className="p-5 flex gap-3">

                        <select
                            className="border border-gray-300 rounded-lg px-3 py-2 "
                            value={filterPegawai}
                            onChange={(e) => setFilterPegawai(e.target.value)}
                        >

                            <option value="">
                                -- Filter Pegawai --
                            </option>

                            {dataPegawai.map((pegawai) => (
                                <option
                                    key={pegawai.id}
                                    value={pegawai.id}
                                >
                                    {pegawai.nama}
                                </option>
                            ))}

                        </select>

                        <select
                            className="border border-gray-300 rounded-lg px-3 py-2 "
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >

                            <option value="">
                                -- Filter Status --
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Disetujui">
                                Disetujui
                            </option>

                            <option value="Ditolak">
                                Ditolak
                            </option>

                        </select>

                    </div>
                    {/* TABLE */}
                    <div className="p-5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">

                                <thead className="bg-violet-600 text-white text-center">
                                    <tr>
                                        <th className="p-4 text-center">No</th>
                                        <th className="p-4 text-left">Nama Pegawai</th>
                                        <th className="p-4 text-center">Tgl Mulai</th>
                                        <th className="p-4 text-center">Tgl Selesai</th>
                                        <th className="p-4 text-left">Alasan</th>
                                        <th className="p-4 text-center">Status</th>
                                        <th className="p-4 text-center">Aksi</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {dataCuti.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-violet-50/30 transition-colors"
                                        >
                                            <td className="p-4 text-center font-medium text-gray-600">
                                                {index + 1}
                                            </td>

                                            <td className="p-4 font-semibold text-gray-800">
                                                {item.nama_pegawai}
                                            </td>

                                            <td className="p-4 text-center text-gray-600">
                                                {item.tanggal_mulai}
                                            </td>

                                            <td className="p-4 text-center text-gray-600">
                                                {item.tanggal_selesai}
                                            </td>

                                            <td className="p-4 text-gray-600">
                                                {item.alasan}
                                            </td>

                                            <td className="p-4 text-center">
                                                <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-bold">
                                                    {item.status}
                                                </span>
                                            </td>

                                            <td className="p-4 flex justify-center gap-3">
                                                <button
                                                    onClick={() => {
                                                        setEditData(item);
                                                        setFormData(item);
                                                        setShowModal(true);
                                                    }}
                                                    className="text-blue-500 hover:text-blue-700 text-lg"
                                                >
                                                    <i className="ri-edit-line"></i>
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-500 hover:text-red-700 text-lg"
                                                >
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fadeIn">

                    <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">

                        <div className="flex justify-between items-center bg-gray-50 border-b p-4">
                            <h2 className="text-lg font-bold text-gray-800">
                                {editData ? 'Edit Data Cuti' : 'Pengajuan Baru'}
                            </h2>

                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="ri-close-line text-2xl"></i>
                            </button>
                        </div>

                        <div className="p-6 space-y-4">

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                    Nama Pegawai
                                </label>

                                <select
                                    className="w-full border-gray-300 border rounded-lg p-2.5 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                                    value={formData.id_guru_pegawai}
                                    onChange={e =>
                                        setFormData({
                                            ...formData,
                                            id_guru_pegawai: e.target.value
                                        })
                                    }
                                >
                                    <option value="">
                                        Pilih Pegawai
                                    </option>

                                    {dataPegawai.map((pegawai) => (
                                        <option
                                            key={pegawai.id}
                                            value={pegawai.id}
                                        >
                                            {pegawai.nama} - {pegawai.jabatan}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                        Mulai
                                    </label>

                                    <input
                                        type="date"
                                        className="w-full border-gray-300 border rounded-lg p-2.5 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                                        value={formData.tanggal_mulai}
                                        onChange={e =>
                                            setFormData({
                                                ...formData,
                                                tanggal_mulai: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                        Selesai
                                    </label>

                                    <input
                                        type="date"
                                        className="w-full border-gray-300 border rounded-lg p-2.5 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                                        value={formData.tanggal_selesai}
                                        onChange={e =>
                                            setFormData({
                                                ...formData,
                                                tanggal_selesai: e.target.value
                                            })
                                        }
                                    />
                                </div>

                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                    Alasan
                                </label>

                                <textarea
                                    rows="3"
                                    className="w-full border-gray-300 border rounded-lg p-2.5 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                                    value={formData.alasan}
                                    onChange={e =>
                                        setFormData({
                                            ...formData,
                                            alasan: e.target.value
                                        })
                                    }
                                />
                            </div>

                        </div>

                        <div className="flex gap-3 justify-end p-6 border-t bg-gray-50">
                            <button
                                onClick={closeModal}
                                className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 font-medium"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleSave}
                                className="px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm"
                            >
                                Simpan Data
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Cuti;