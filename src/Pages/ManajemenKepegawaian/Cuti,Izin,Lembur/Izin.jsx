import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import Swal from 'sweetalert2';
import 'remixicon/fonts/remixicon.css';

const Izin = () => {

    const [dataIzin, setDataIzin] = useState([]);
    const [dataPegawai, setDataPegawai] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [filterPegawai, setFilterPegawai] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const [formData, setFormData] = useState({
        id_guru_pegawai: '',
        tanggal: '',
        jenis_izin: '',
        keterangan: ''
    });

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

    const fetchIzin = async () => {

        try {

            let url = 'http://localhost:8000/api/manajemen-izin';

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
                setDataIzin(result.data);
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPegawai();
    }, []);

    useEffect(() => {
        fetchIzin();
    }, [filterPegawai, filterStatus]);

    const closeModal = () => {
        setShowModal(false);

        setFormData({
            id_guru_pegawai: '',
            tanggal: '',
            jenis_izin: '',
            keterangan: ''
        });
    };

    const handleSave = async () => {

        if (
            !formData.id_guru_pegawai ||
            !formData.tanggal ||
            !formData.jenis_izin
        ) {

            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Mohon lengkapi data!'
            });

            return;
        }

        const response = await fetch(
            'http://localhost:8000/api/manajemen-izin',
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
            fetchIzin();

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
                            Manajemen Izin
                        </h1>

                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 font-medium"
                        >
                            <i className="ri-add-line"></i>
                            Ajukan Izin
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
                                    <th className="p-3">Jenis Izin</th>
                                    <th className="p-3 text-left">Keterangan</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                {dataIzin.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="bg-white hover:bg-gray-50"
                                    >

                                        <td className="p-3 text-center">
                                            {item.no}
                                        </td>

                                        <td className="p-3">
                                            {item.nama_pegawai}
                                        </td>

                                        <td className="p-3 text-center">
                                            {item.tanggal}
                                        </td>

                                        <td className="p-3 text-center">
                                            {item.jenis_izin}
                                        </td>

                                        <td className="p-3">
                                            {item.keterangan}
                                        </td>

                                        <td className="p-3 text-center">
                                            <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">
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
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

                    <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">

                        <div className="bg-violet-600 text-white p-4 flex justify-between items-center">
                            <h2 className="font-semibold text-lg">
                                Pengajuan Izin
                            </h2>

                            <button onClick={closeModal}>
                                <i className="ri-close-line text-2xl"></i>
                            </button>
                        </div>

                        <div className="p-5 space-y-4">

                            <div>
                                <label className="block text-sm mb-1 font-medium">
                                    Nama Pegawai
                                </label>

                                <select
                                    className="w-full border border-gray-300 rounded px-3 py-2"
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
                                <label className="block text-sm mb-1 font-medium">
                                    Tanggal
                                </label>

                                <input
                                    type="date"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    value={formData.tanggal}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            tanggal: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1 font-medium">
                                    Jenis Izin
                                </label>

                                <select
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    value={formData.jenis_izin}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            jenis_izin: e.target.value
                                        })
                                    }
                                >
                                    <option value="">
                                        Pilih Jenis Izin
                                    </option>

                                    <option value="Sakit">
                                        Sakit
                                    </option>

                                    <option value="Keperluan Keluarga">
                                        Keperluan Keluarga
                                    </option>

                                    <option value="Acara">
                                        Acara
                                    </option>

                                </select>
                            </div>

                            <div>
                                <label className="block text-sm mb-1 font-medium">
                                    Keterangan
                                </label>

                                <textarea
                                    rows="3"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    value={formData.keterangan}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            keterangan: e.target.value
                                        })
                                    }
                                />
                            </div>

                        </div>

                        <div className="flex justify-end gap-3 p-4 border-t">

                            <button
                                onClick={closeModal}
                                className="px-4 py-2 border rounded"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleSave}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
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

export default Izin;