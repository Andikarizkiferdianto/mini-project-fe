import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'remixicon/fonts/remixicon.css';

const DokumenSekolah = () => {
    const [dokumen, setDokumen] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // State Kontrol Modal & Form
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        judul: '',
        tanggal: '',
        deskripsi: ''
    });
    const [fileDokumen, setFileDokumen] = useState(null);

    useEffect(() => {
        fetchDokumen();
    }, []);

     const fetchDokumen = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8000/api/dokumen-sekolah");
            if (res.data.status === "success") {
                setDokumen(res.data.data);
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Gagal memuat data dokumen sekolah.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentId(null);
        setFormData({ judul: '', tanggal: '', deskripsi: '' });
        setFileDokumen(null);
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setIsEditMode(true);
        setCurrentId(item.id);
        setFormData({
            judul: item.judul || '',
            tanggal: item.tanggal || '',
            deskripsi: item.deskripsi || ''
        });
        setFileDokumen(null);
        setIsModalOpen(true);
    };

     const handleSubmit = async (e) => {
        e.preventDefault();
        const dataPayload = new FormData();
        dataPayload.append('judul', formData.judul);
        dataPayload.append('tanggal', formData.tanggal);
        dataPayload.append('deskripsi', formData.deskripsi);
        if (fileDokumen) {
            dataPayload.append('file_dokumen', fileDokumen);
        }

        try {
            Swal.showLoading();
            const url = isEditMode
                ? `http://localhost:8000/api/dokumen-sekolah?id=${currentId}`
                : "http://localhost:8000/api/dokumen-sekolah";

            const res = await axios.post(url, dataPayload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.status === "success") {
                Swal.fire('Berhasil!', res.data.message, 'success');
                setIsModalOpen(false);
                fetchDokumen();
            }
        } catch (err) {
            Swal.fire('Gagal', err.response?.data?.message || 'Gagal memproses dokumen.', 'error');
        }
    };

     const handleDelete = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Berkas dokumentasi akan dihapus permanen dari server!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`http://localhost:8000/api/dokumen-sekolah?id=${id}`);
                    if (res.data.status === "success") {
                        Swal.fire('Terhapus!', res.data.message, 'success');
                        fetchDokumen();
                    }
                } catch (err) {
                    Swal.fire('Gagal!', 'Tidak dapat menghapus dokumen.', 'error');
                }
            }
        });
    };

    const filteredDokumen = dokumen.filter(item =>
        item.judul?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.deskripsi?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">
                 <div className="bg-violet-600 p-3 rounded-t-lg flex justify-between items-center shadow-md">
                    <h2 className="text-white font-semibold flex items-center gap-2">
                        <i className="ri-gallery-fill text-2xl"></i> Dokumentasi Sekolah
                    </h2>
                    <button onClick={openAddModal} className="bg-white text-black text-sm px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-100 transition font-medium">
                        <i className="ri-add-line"></i> Tambah Dokumentasi
                    </button>
                </div>

                 <div className="bg-white p-6 shadow rounded-b-lg border border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                        <div className="flex flex-wrap gap-1">
                            {['Copy', 'CSV', 'Excel', 'PDF', 'Print'].map((btn) => (
                                <button key={btn} className="border border-gray-300 px-4 py-1.5 text-sm rounded shadow-sm hover:bg-gray-50 text-gray-700 font-medium">
                                    {btn}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600 font-medium">Search:</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-violet-500 shadow-sm text-sm"
                                placeholder="Cari judul/deskripsi..."
                            />
                        </div>
                    </div>

                    {/* TABEL */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-3 w-10">No</th>
                                    <th className="p-3">Judul</th>
                                    <th className="p-3">Tanggal</th>
                                    <th className="p-3 text-left">Deskripsi</th>
                                    <th className="p-3 text-center">File</th>
                                    <th className="p-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800 text-center">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-gray-500">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                                                Memuat berkas dokumentasi...
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredDokumen.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-6 text-gray-400 italic">Belum ada dokumentasi sekolah.</td>
                                    </tr>
                                ) : (
                                    filteredDokumen.map((item, i) => (
                                        <tr key={item.id} className="border-t hover:bg-gray-50 transition-colors">
                                            <td className="p-3 text-gray-500">{i + 1}</td>
                                            <td className="p-3 font-semibold text-slate-700">{item.judul}</td>
                                            <td className="p-3">{item.tanggal}</td>
                                            <td className="p-3 text-left max-w-xs truncate" title={item.deskripsi}>{item.deskripsi || '-'}</td>
                                            <td className="p-3">
                                                {item.file_dokumen ? (
                                                    <button
                                                        onClick={() => window.open(`http://localhost:8000/uploads/dokumen/${item.file_dokumen}`, '_blank')}
                                                        className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold hover:bg-emerald-200 transition"
                                                    >
                                                        <i className="ri-eye-line"></i> Lihat File
                                                    </button>
                                                ) : <span className="text-gray-400 italic text-xs">Tidak ada</span>}
                                            </td>
                                            <td className="p-3 flex justify-center items-center gap-3 text-lg">
                                                <button onClick={() => openEditModal(item)} className="text-blue-500 hover:text-blue-700 transition" title="Edit">
                                                    <i className="ri-edit-2-line"></i>
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 transition" title="Hapus">
                                                    <i className="ri-delete-bin-6-line"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-600">
                        <p>Showing 1 to {filteredDokumen.length} of {filteredDokumen.length}
                            entries
                        </p>
                        <div className="flex border border-gray-300 rounded shadow-sm overflow-hidden mt-4 md:mt-0">
                            <button className="px-4 py-2 hover:bg-gray-100 transition text-gray-400" disabled>Previous</button>
                            <button className="px-4 py-2 bg-violet-600 text-white font-bold">
                                1
                            </button>
                            <button className="px-4 py-2 border-l border-gray-300 hover:bg-gray-100 transition text-gray-400" disabled>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL FORM POP-UP */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fadeIn">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
                        <div className="flex justify-between items-center bg-gray-50 border-b p-4">
                            <h3 className="font-semibold text-lg">
                                <i className={isEditMode ? "ri-edit-box-line mr-1" : "ri-add-circle-line mr-1"}></i>
                                {isEditMode ? 'Edit Dokumentasi' : 'Tambah Dokumentasi'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-white text-xl hover:text-gray-200">
                                <i className="ri-close-line"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}
                            className="p-6 space-y-4 text-sm">
                            <div>
                                <label className="block font-medium mb-1">
                                    Judul Dokumentasi
                                </label>
                                <input
                                    type="text"
                                    name="judul"
                                    value={formData.judul}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-violet-500 outline-none"
                                    placeholder="Contoh: Akreditasi Sekolah 2026"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">
                                    Tanggal Kegiatan
                                </label>
                                <input
                                    type="date"
                                    name="tanggal"
                                    value={formData.tanggal}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-violet-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">
                                    Deskripsi Ringkas
                                </label>
                                <textarea
                                    name="deskripsi"
                                    value={formData.deskripsi}
                                    onChange={handleInputChange} rows="3"
                                    className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-violet-500 outline-none"
                                    placeholder="Masukkan keterangan tambahan kegiatan...">
                                </textarea>
                            </div>

                            <div>
                                <label className="block font-medium mb-1">
                                    Berkas Dokumen / Foto
                                    ({isEditMode ? 'Opsional' : 'Wajib'})
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => setFileDokumen(e.target.files[0])}
                                    required={!isEditMode}
                                    className="w-full text-xs border border-gray-300 rounded p-1.5 bg-gray-50 outline-none"
                                />
                            </div>

                            <div className="pt-4 border-t flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 transition">Batal</button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-medium flex items-center gap-1">
                                    <i className="ri-save-line"></i> Simpan Data
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DokumenSekolah;