import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'remixicon/fonts/remixicon.css';

const RiwayatAset = () => {
    const [riwayatData, setRiwayatData] = useState([]);
    const [asetList, setAsetList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        id: '',
        id_aset: '',
        aktivitas: '',
        keterangan: '',
        pengguna: ''
    });

    // Ambil log riwayat dari backend
    const fetchRiwayat = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/riwayat-aset');
            setRiwayatData(res.data.data || []);
        } catch (err) {
            console.error("Gagal mengambil data riwayat:", err);
        }
    };

    // Ambil daftar master aset untuk dipasangkan ke select option
    const fetchAsetOptions = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/inventaris-aset');
            setAsetList(res.data.data || []);
        } catch (err) {
            console.error("Gagal mengambil opsi master aset:", err);
        }
    };

    useEffect(() => {
        fetchRiwayat();
        fetchAsetOptions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const openAddModal = () => {
        setIsEdit(false);
        setForm({ id: '', id_aset: '', aktivitas: '', keterangan: '', pengguna: '' });
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setIsEdit(true);
        setForm({
            id: item.id,
            id_aset: item.id_aset,
            aktivitas: item.aktivitas,
            keterangan: item.keterangan,
            pengguna: item.pengguna
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res;
            if (isEdit) {
                res = await axios.put('http://localhost:8000/api/riwayat-aset', form);
            } else {
                res = await axios.post('http://localhost:8000/api/riwayat-aset', form);
            }
            Swal.fire('Berhasil', res.data.message, 'success');
            setShowModal(false);
            fetchRiwayat();
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Gagal menyimpan riwayat', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Hapus riwayat aktivitas?',
            text: "Data catatan log ini akan terhapus permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8000/api/riwayat-aset?id=${id}`);
                    Swal.fire('Terhapus!', 'Catatan aktivitas berhasil dihapus.', 'success');
                    fetchRiwayat();
                } catch (err) {
                    Swal.fire('Error', 'Gagal menghapus catatan', 'error');
                }
            }
        });
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">
                {/* HEADER */}
                <div className="bg-violet-600 p-4 rounded-t-lg flex justify-between items-center shadow-md">
                    <h2 className="text-white font-semibold flex items-center gap-2">
                        <i className="ri-history-fill text-2xl"></i> Riwayat Aktivitas Aset
                    </h2>
                    <button
                        onClick={openAddModal}
                        className="bg-white text-violet-700 text-sm font-medium px-4 py-2 rounded shadow hover:bg-gray-50 transition flex items-center gap-1"
                    >
                        <i className="ri-add-line font-bold"></i> Tambah Aktivitas
                    </button>
                </div>

                {/* LOG DATA TABLE */}
                <div className="bg-white p-6 shadow rounded-b-lg border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-3 w-12">No</th>
                                    <th>Nama Aset</th>
                                    <th>Aktivitas</th>
                                    <th>Keterangan</th>
                                    <th>Pengguna </th>
                                    <th>Tanggal</th>
                                    <th className="w-28">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800 text-center">
                                {riwayatData.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="p-5 text-gray-400 italic">Belum ada log riwayat aktivitas aset.</td>
                                    </tr>
                                ) : (
                                    riwayatData.map((item, index) => (
                                        <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                                            <td className="p-3">{index + 1}</td>
                                            <td className="text-left px-3 font-medium text-gray-700">{item.nama_aset}</td>
                                            <td>
                                                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${item.aktivitas === 'Maintenance' ? 'bg-amber-100 text-amber-800' :
                                                    item.aktivitas === 'Pemindahan' ? 'bg-blue-100 text-blue-800' :
                                                        item.aktivitas === 'Pengadaan Baru' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {item.aktivitas}
                                                </span>
                                            </td>
                                            <td className="text-left px-3 text-gray-600">{item.keterangan || '-'}</td>
                                            <td>{item.pengguna}</td>
                                            <td className="text-gray-500">{item.tanggal}</td>
                                            <td className="p-3 space-x-2">
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-2 py-1 rounded border border-blue-200"
                                                >
                                                    <i className="ri-edit-line"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-600 hover:text-red-800 font-medium text-xs bg-red-50 px-2 py-1 rounded border border-red-200"
                                                >
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* DIALOG MODAL CRUD */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                        <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
                            <div className="flex justify-between items-center bg-gray-50 border-b p-4">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {isEdit ? '📝 Perbarui Log Aktivitas' : '➕ Catat Aktivitas Aset'}
                                </h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <i className="ri-close-line text-2xl"></i>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                {/* OPSI NAMA ASET */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Pilih Aset Target</label>
                                    <select
                                        name="id_aset"
                                        value={form.id_aset}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                                    >
                                        <option value="">-- Pilih Nama Aset --</option>
                                        {asetList.map((a) => (
                                            <option key={a.id} value={a.id}>{a.nama_aset}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* OPSI AKTIVITAS (STATIS) */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Aktivitas</label>
                                    <select
                                        name="aktivitas"
                                        value={form.aktivitas}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                                    >
                                        <option value="">-- Pilih Jenis Aktivitas --</option>
                                        <option value="Pengadaan Baru">Peminjaman</option>
                                        <option value="Maintenance">Pengembalian</option>
                                        <option value="Pemindahan">Perbaikan</option>
                                        <option value="Rusak/Afkir">Penghapusan</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Keterangan</label>
                                    <textarea
                                        name="keterangan"
                                        value={form.keterangan}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Pengguna</label>
                                    <input
                                        type="text"
                                        name="pengguna"
                                        value={form.pengguna}
                                        onChange={handleChange}
                                        required
                                        placeholder="Nama pengguna/peminjam (opsional)"
                                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                                    />
                                </div>


                                <div className="flex justify-end gap-2 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-400 text-white rounded text-sm hover:bg-gray-500 transition"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-5 py-2 bg-green-600 text-white font-medium rounded text-sm hover:bg-green-700 transition"
                                    >
                                        {loading ? 'Memproses...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RiwayatAset;