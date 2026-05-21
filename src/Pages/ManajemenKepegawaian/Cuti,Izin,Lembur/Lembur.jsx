import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import Swal from 'sweetalert2';
import 'remixicon/fonts/remixicon.css';

const Lembur = () => {

    const [dataLembur, setDataLembur] = useState([]);
    const [dataPegawai, setDataPegawai] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const [filterPegawai, setFilterPegawai] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const [formData, setFormData] = useState({
        id_guru_pegawai: '',
        tanggal: '',
        jam_mulai: '',
        jam_selesai: '',
        kegiatan: ''
    });

    const fetchLembur = async () => {
        try {

            let url = 'http://localhost:8000/api/manajemen-lembur';

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
                setDataLembur(result.data);
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
        fetchLembur();
    }, [filterPegawai, filterStatus]);

    const closeModal = () => {

        setShowModal(false);
        setEditData(null);

        setFormData({
            id_guru_pegawai: '',
            tanggal: '',
            jam_mulai: '',
            jam_selesai: '',
            kegiatan: ''
        });
    };

    const handleSave = async () => {

        if (
            !formData.id_guru_pegawai ||
            !formData.tanggal ||
            !formData.jam_mulai ||
            !formData.jam_selesai
        ) {

            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Mohon lengkapi data lembur!'
            });

            return;
        }

        const response = await fetch(
            'http://localhost:8000/api/manajemen-lembur',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
        );

        const result = await response.json();

        if (result.status === 'success') {

            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: result.message,
                timer: 1500,
                showConfirmButton: false
            });

            closeModal();
            fetchLembur();

        } else {

            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: result.message
            });

        }
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-4 mt-12">

                <div className="bg-white border border-gray-100 rounded shadow-sm mt-5">

                    {/* HEADER */}
                    <div className="flex bg-violet-600 justify-between items-center p-4 rounded-t-md">

                        <h1 className="text-lg text-white font-medium ">
                            Manajemen Lembur
                        </h1>

                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 font-medium"
                        >
                            <i className="ri-add-line"></i>
                            Ajukan Lembur
                        </button>

                    </div>

                    {/* FILTER */}
                    <div className="p-4 flex gap-3">

                        <select
                            className="border border-gray-300 rounded px-3 py-2 w-56"
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
                            className="border border-gray-300 rounded px-3 py-2 w-40"
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
                    <div className="overflow-x-auto px-4 pb-4">

                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">

                            <thead className="bg-violet-600 text-white text-center">

                                <tr>
                                    <th className="p-3 w-14">No</th>
                                    <th className="p-3 text-left">Nama Pegawai</th>
                                    <th className="p-3">Tanggal</th>
                                    <th className="p-3">Jam Mulai</th>
                                    <th className="p-3">Jam Selesai</th>
                                    <th className="p-3 text-left">Kegiatan</th>
                                    <th className="p-3">Status</th>
                                </tr>

                            </thead>

                            <tbody>

                                {dataLembur.map((item, index) => (

                                    <tr
                                        key={item.id}
                                        className="bg-white hover:bg-gray-50"
                                    >

                                        <td className="p-3 text-center">
                                            {index + 1}
                                        </td>

                                        <td className="p-3">
                                            {item.nama_pegawai}
                                        </td>

                                        <td className="p-3 text-center">
                                            {item.tanggal}
                                        </td>

                                        <td className="p-3 text-center">
                                            {item.jam_mulai}
                                        </td>

                                        <td className="p-3 text-center">
                                            {item.jam_selesai}
                                        </td>

                                        <td className="p-3">
                                            {item.kegiatan}
                                        </td>

                                        <td className="p-3 text-center">

                                            <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-bold">
                                                {item.status}
                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* MODAL */}
            {showModal && (

                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                    <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">

                        <div className="flex justify-between items-center bg-gray-50 border-b p-4">

                            <h2 className="text-lg font-bold text-gray-800">
                                Pengajuan Lembur
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
                                    className="w-full border-gray-300 border rounded-lg p-2.5"
                                    value={formData.id_guru_pegawai}
                                    onChange={(e) =>
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
                                            {pegawai.nama}
                                        </option>
                                    ))}

                                </select>

                            </div>

                            <div>

                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                    Tanggal
                                </label>

                                <input
                                    type="date"
                                    className="w-full border-gray-300 border rounded-lg p-2.5"
                                    value={formData.tanggal}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            tanggal: e.target.value
                                        })
                                    }
                                />

                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div>

                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                        Jam Mulai
                                    </label>

                                    <input
                                        type="time"
                                        className="w-full border-gray-300 border rounded-lg p-2.5"
                                        value={formData.jam_mulai}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                jam_mulai: e.target.value
                                            })
                                        }
                                    />

                                </div>

                                <div>

                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                        Jam Selesai
                                    </label>

                                    <input
                                        type="time"
                                        className="w-full border-gray-300 border rounded-lg p-2.5"
                                        value={formData.jam_selesai}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                jam_selesai: e.target.value
                                            })
                                        }
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                    Kegiatan
                                </label>

                                <textarea
                                    rows="3"
                                    className="w-full border-gray-300 border rounded-lg p-2.5"
                                    value={formData.kegiatan}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            kegiatan: e.target.value
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
                                Simpan
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Lembur;