import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'remixicon/fonts/remixicon.css';

const Aset = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // State tambahan untuk menyimpan daftar kategori & lokasi asli dari DB
    const [listKategori, setListKategori] = useState([]);
    const [listLokasi, setListLokasi] = useState([]);

    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        id: '',
        nama_aset: '',
        kategori: '',
        lokasi: '',
        jumlah: '',
        harga_perolehan: '',
        umur_ekonomis: ''
    });

    // 1. Ambil data Inventaris Aset dari backend
    const fetchAset = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/inventaris-aset');
            setData(res.data.data || []);
        } catch (err) {
            console.error("Gagal mengambil data aset:", err);
        }
    };

    // 2. Ambil data Opsi Kategori asli dari DB
    const fetchKategoriOptions = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/setting-kategori');
            setListKategori(res.data.data || []);
        } catch (err) {
            console.error("Gagal memuat opsi kategori:", err);
        }
    };

    // 3. Ambil data Opsi Lokasi asli dari DB
    const fetchLokasiOptions = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/setting-lokasi');
            setListLokasi(res.data.data || []);
        } catch (err) {
            console.error("Gagal memuat opsi lokasi:", err);
        }
    };

    useEffect(() => {
        fetchAset();
        fetchKategoriOptions();
        fetchLokasiOptions();
    }, []);

    // Handler Perubahan Nilai Input agar bisa diketik dengan lancar
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Buka Modal Tambah
    const openAddModal = () => {
        setIsEdit(false);
        setForm({ id: '', nama_aset: '', kategori: '', lokasi: '', jumlah: '', harga_perolehan: '', umur_ekonomis: '' });
        setShowModal(true);
    };

    // Buka Modal Edit
    const openEditModal = (item) => {
        setIsEdit(true);
        setForm({
            id: item.id,
            nama_aset: item.nama_aset,
            kategori: item.kategori,
            lokasi: item.lokasi,
            jumlah: item.jumlah,
            harga_perolehan: item.harga_perolehan,
            umur_ekonomis: item.umur_ekonomis
        });
        setShowModal(true);
    };

    // Submit handler untuk simpan data baru atau update data lama
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res;

            if (isEdit) {
                res = await axios.put('http://localhost:8000/api/inventaris-aset', form);
            } else {
                res = await axios.post('http://localhost:8000/api/inventaris-aset', form);
            }

            Swal.fire('Berhasil', res.data.message, 'success');
            setShowModal(false);
            fetchAset();
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Gagal memproses data aset', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Hapus data aset
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Apakah anda yakin?',
            text: "Data aset ini akan dihapus secara permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8000/api/inventaris-aset?id=${id}`);
                    Swal.fire('Terhapus!', 'Aset berhasil dihapus.', 'success');
                    fetchAset();
                } catch (err) {
                    Swal.fire('Error', 'Gagal menghapus aset', 'error');
                }
            }
        });
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">
                {/* CONTAINER HEADER */}
                <div className="bg-violet-600 p-4 rounded-t-lg flex justify-between items-center shadow-md">
                    <h2 className="text-white font-semibold flex items-center gap-2">
                        <i className="ri-database-2-line"></i> Data Inventaris & Aset Sekolah
                    </h2>
                    <button
                        onClick={openAddModal}
                        className="bg-white text-violet-700 text-sm font-medium px-4 py-2 rounded shadow hover:bg-gray-50 transition flex items-center gap-1"
                    >
                        <i className="ri-add-line font-bold"></i> Tambah Aset
                    </button>
                </div>

                {/* TABLE CARD */}
               <div className="bg-white p-6 shadow rounded-b-lg border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-3">No</th>
                                    <th>Nama Aset</th>
                                    <th>Kategori</th>
                                    <th>Lokasi</th>
                                    <th>Jumlah</th>
                                    <th>Harga Perolehan</th>
                                    <th>Umur Ekonomis</th>
                                    <th>Penyusutan / Thn</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800 text-center">
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="p-5 text-center text-gray-400 italic">Belum ada data aset sekolah.</td>
                                    </tr>
                                ) : (
                                    data.map((item, index) => (
                                        <tr key={item.id} className="text-center border-t hover:bg-gray-50 transition">
                                            <td className="p-3">{index + 1}</td>
                                            <td className="text-left px-3 font-medium text-gray-700">{item.nama_aset}</td>
                                            <td>{item.kategori}</td>
                                            <td>{item.lokasi}</td>
                                            <td>{item.jumlah}</td>
                                            <td>Rp {Number(item.harga_perolehan).toLocaleString('id-ID')}</td>
                                            <td>{item.umur_ekonomis} Tahun</td>
                                            <td className="text-amber-600 font-medium">Rp {Number(item.penyusutan_per_unit).toLocaleString('id-ID')}</td>
                                            <td className="space-x-3">
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

                {/* MODAL FORM */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fadeIn">
                        <div className="bg-white w-full max-w-lg rounded-lg shadow-xl overflow-hidden">
                            <div className="flex justify-between items-center bg-gray-50 border-b p-4">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {isEdit ? '📝 Edit Data Aset' : '➕ Tambah Aset Baru'}
                                </h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <i className="ri-close-line text-2xl"></i>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Nama Aset</label>
                                    <input
                                        type="text"
                                        name="nama_aset"
                                        value={form.nama_aset}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-200 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* SELEKSI KATEGORI DARI DB */}
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-1">Kategori</label>
                                        <select
                                            name="kategori"
                                            value={form.kategori}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-200 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        >
                                            <option value="">-- Pilih Kategori --</option>
                                            {listKategori.map((kat) => (
                                                <option key={kat.id} value={kat.nama_kategori}>
                                                    {kat.nama_kategori}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* SELEKSI LOKASI DARI DB */}
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-1">Lokasi</label>
                                        <select
                                            name="lokasi"
                                            value={form.lokasi}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-200 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        >
                                            <option value="">-- Pilih Lokasi --</option>
                                            {listLokasi.map((lok) => (
                                                <option key={lok.id} value={lok.nama_lokasi}>
                                                    {lok.nama_lokasi}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-1">Jumlah</label>
                                        <input
                                            type="number"
                                            name="jumlah"
                                            value={form.jumlah}
                                            onChange={handleChange}
                                            required
                                            min="1"
                                            className="w-full border border-gray-200 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-1">Harga Perolehan (Rp)</label>
                                        <input
                                            type="number"
                                            name="harga_perolehan"
                                            value={form.harga_perolehan}
                                            onChange={handleChange}
                                            required
                                            min="0"
                                            className="w-full border border-gray-200 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Umur Ekonomis (Tahun)</label>
                                    <input
                                        type="number"
                                        name="umur_ekonomis"
                                        value={form.umur_ekonomis}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        className="w-full border border-gray-200 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    />
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-5 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition shadow"
                                    >
                                        {loading ? 'Menyimpan...' : 'Simpan'}
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

export default Aset;