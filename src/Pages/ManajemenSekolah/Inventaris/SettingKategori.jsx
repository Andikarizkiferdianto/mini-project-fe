import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'remixicon/fonts/remixicon.css';

const SettingKategori = () => {
    const [kategoriData, setKategoriData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        id: '',
        nama_kategori: ''
    });

    // Mengambil data seluruh kategori dari backend
    const fetchKategori = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/setting-kategori');
            setKategoriData(res.data.data || []);
        } catch (err) {
            console.error("Gagal memuat data kategori:", err);
        }
    };

    useEffect(() => {
        fetchKategori();
    }, []);

    // Perubahan ketikan input di form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Trigger Modal Tambah Baru
    const openAddModal = () => {
        setIsEdit(false);
        setForm({ id: '', nama_kategori: '' });
        setShowModal(true);
    };

    // Trigger Modal Edit Data Pilihan
    const openEditModal = (item) => {
        setIsEdit(true);
        setForm({
            id: item.id,
            nama_kategori: item.nama_kategori
        });
        setShowModal(true);
    };

    // Eksekusi Submit Simpan (POST) & Edit (PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res;
            if (isEdit) {
                res = await axios.put('http://localhost:8000/api/setting-kategori', form);
            } else {
                res = await axios.post('http://localhost:8000/api/setting-kategori', form);
            }
            Swal.fire('Berhasil', res.data.message, 'success');
            setShowModal(false);
            fetchKategori();
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Gagal memproses data', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Eksekusi Hapus Kategori (DELETE)
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Hapus kategori ini?',
            text: "Aset dengan kategori berkaitan mungkin akan kehilangan relasinya!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8000/api/setting-kategori?id=${id}`);
                    Swal.fire('Terhapus!', 'Kategori berhasil dihapus.', 'success');
                    fetchKategori();
                } catch (err) {
                    Swal.fire('Error', 'Gagal menghapus kategori', 'error');
                }
            }
        });
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">
                {/* HEAD CONTAINER BAR */}
                <div className="bg-violet-600 p-4 rounded-t-lg flex justify-between items-center shadow-md">
                    <h2 className="text-white font-semibold flex items-center gap-2">
                        <i className="ri-price-tag-3-fill text-2xl"></i> Pengaturan Kategori Aset
                    </h2>
                    <button
                        onClick={openAddModal}
                        className="bg-white text-violet-700 text-sm font-medium px-4 py-2 rounded shadow hover:bg-gray-50 transition flex items-center gap-1"
                    >
                        <i className="ri-add-line font-bold"></i> Tambah Kategori
                    </button>
                </div>

                {/* TABLE CONTAINER CARD */}
                <div className="bg-white p-6 shadow rounded-b-lg border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-3 w-16">No</th>
                                    <th className="p-3 text-left">Nama Kategori</th>
                                    <th className="p-3 w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800 text-center">
                                {kategoriData.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="p-5 text-gray-400 italic">Belum ada daftar kategori aset.</td>
                                    </tr>
                                ) : (
                                    kategoriData.map((item, index) => (
                                        <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                                            <td className="p-3 font-medium text-gray-500">{index + 1}</td>
                                            <td className="text-left px-4 font-semibold text-gray-700">{item.nama_kategori}</td>
                                            <td className="p-3 space-x-2">
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-2.5 py-1 rounded border border-blue-200"
                                                >
                                                    <i className="ri-edit-line"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-600 hover:text-red-800 font-medium text-xs bg-red-50 px-2.5 py-1 rounded border border-red-200"
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

                {/* POPUP MODAL CRUD FORM */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fadeIn">
                        <div className="bg-white w-full max-w-sm rounded-lg shadow-xl overflow-hidden">
                            <div className="flex justify-between items-center bg-gray-50 border-b p-4">
                                <h2 className="text-base font-semibold text-gray-800">
                                    {isEdit ? '📝 Perbarui Nama Kategori' : '➕ Tambah Kategori Baru'}
                                </h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <i className="ri-close-line text-2xl"></i>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Nama Kategori</label>
                                    <input
                                        type="text"
                                        name="nama_kategori"
                                        value={form.nama_kategori}
                                        onChange={handleChange}
                                        required
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

export default SettingKategori;