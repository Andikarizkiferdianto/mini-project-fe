import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import 'remixicon/fonts/remixicon.css';

const SuratMenyurat = () => {
    const [surat, setSurat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

     const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

     const [formData, setFormData] = useState({
        nomor_surat: '',
        perihal: '',
        tgl_surat: '',
        tgl_terima: '',
        jenis_surat: 'Masuk',
        keterangan: ''
    });
    const [fileSurat, setFileSurat] = useState(null);

    useEffect(() => {
        fetchSurat();
    }, []);

     const fetchSurat = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8000/api/surat-menyurat");
            if (res.data.status === "success") {
                setSurat(res.data.data);
            }
        } catch (err) {
            console.error("Gagal memuat data surat:", err);
            Swal.fire('Error', 'Gagal mengambil data dari server backend.', 'error');
        } finally {
            setLoading(false);
        }
    };

     const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

     const handleFileChange = (e) => {
        setFileSurat(e.target.files[0]);
    };

     const openAddModal = () => {
        setIsEditMode(false);
        setCurrentId(null);
        setFormData({
            nomor_surat: '',
            perihal: '',
            tgl_surat: '',
            tgl_terima: '',
            jenis_surat: 'Masuk',
            keterangan: ''
        });
        setFileSurat(null);
        setIsModalOpen(true);
    };

     const openEditModal = (item) => {
        setIsEditMode(true);
        setCurrentId(item.id);
        setFormData({
            nomor_surat: item.nomor_surat || '',
            perihal: item.perihal || '',
            tgl_surat: item.tgl_surat || '',
            tgl_terima: item.tgl_terima || '',
            jenis_surat: item.jenis_surat || 'Masuk',
            keterangan: item.keterangan || ''
        });
        setFileSurat(null);  
        setIsModalOpen(true);
    };

     const handleSubmit = async (e) => {
        e.preventDefault();

         const dataPayload = new FormData();
        dataPayload.append('nomor_surat', formData.nomor_surat);
        dataPayload.append('perihal', formData.perihal);
        dataPayload.append('tgl_surat', formData.tgl_surat);
        dataPayload.append('tgl_terima', formData.tgl_terima);
        dataPayload.append('jenis_surat', formData.jenis_surat);
        dataPayload.append('keterangan', formData.keterangan);
        if (fileSurat) {
            dataPayload.append('file_surat', fileSurat);
        }

        try {
            Swal.showLoading();
            let res;
            if (isEditMode) {
                 res = await axios.post(`http://localhost:8000/api/surat-menyurat?id=${currentId}`, dataPayload, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                 res = await axios.post("http://localhost:8000/api/surat-menyurat", dataPayload, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            if (res.data.status === "success") {
                Swal.fire('Berhasil!', res.data.message || 'Data arsip surat aman disimpan.', 'success');
                setIsModalOpen(false);
                fetchSurat();  
            }
        } catch (err) {
            console.error("Gagal menyimpan data:", err);
            Swal.fire('Gagal', err.response?.data?.message || 'Terjadi gangguan sistem data.', 'error');
        }
    };

     const handleDelete = async (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Arsip surat yang dihapus tidak dapat dipulihkan kembali!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`http://localhost:8000/api/surat-menyurat?id=${id}`);
                    if (res.data.status === "success") {
                        Swal.fire('Terhapus!', res.data.message || 'Surat telah dikeluarkan dari arsip.', 'success');
                        fetchSurat(); // Refresh data tabel
                    }
                } catch (err) {
                    console.error("Gagal menghapus surat:", err);
                    Swal.fire('Gagal!', 'Tidak dapat menghapus arsip surat ini.', 'error');
                }
            }
        });
    };

     const filteredSurat = surat.filter(item =>
        item.nomor_surat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.perihal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.jenis_surat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sumber_surat?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">
                <div className="bg-violet-600 p-3 rounded-t-lg flex justify-between items-center shadow-md">
                    <h2 className="text-white font-semibold flex items-center gap-2">
                        <i className="ri-mail-fill text-2xl"></i>  Surat Menyurat
                    </h2>
                    <button
                        onClick={openAddModal}
                        className="bg-white text-black text-sm px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-100 transition font-medium"
                    >
                        <i className="ri-add-line"></i> Tambah Surat
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
                            />
                        </div>
                    </div>

                    {/* TABEL */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-3 w-10">No</th>
                                    <th className="p-3">No. Surat</th>
                                    <th className="p-3">Judul</th>
                                    <th className="p-3">Tanggal Surat</th>
                                    <th className="p-3 text-center">Jenis</th>
                                    <th className="p-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800 text-center">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="p-8 text-gray-500">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                                                Memuat data arsip surat...
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredSurat.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="p-6 text-gray-400 italic">Data surat tidak ditemukan</td>
                                    </tr>
                                ) : (
                                    filteredSurat.map((item, i) => (
                                        <tr key={item.id} className="border-t hover:bg-gray-50 transition-colors">
                                            <td className="p-3 font-medium text-gray-500">{i + 1}</td>
                                            <td className="p-3 font-semibold text-slate-700">{item.nomor_surat}</td>
                                            <td className="p-3 text-left max-w-xs truncate" title={item.perihal}>{item.perihal}</td>
                                            <td className="p-3">{item.tgl_surat}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.jenis_surat?.toLowerCase() === 'masuk'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {item.jenis_surat}
                                                </span>
                                            </td>
                                            <td className="p-3 flex justify-center items-center gap-3 text-lg">
                                                {item.file_surat && (
                                                    <button
                                                        className="text-emerald-500 hover:text-emerald-700 transition"
                                                        title="Lihat File"
                                                        onClick={() => window.open(`http://localhost:8000/uploads/surat/${item.file_surat}`, '_blank')}
                                                    >
                                                        <i className="ri-eye-line"></i>
                                                    </button>
                                                )}
                                                <button
                                                    className="text-blue-500 hover:text-blue-700 transition"
                                                    title="Edit Data"
                                                    onClick={() => openEditModal(item)}
                                                >
                                                    <i className="ri-edit-2-line"></i>
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700 transition"
                                                    title="Hapus Surat"
                                                    onClick={() => handleDelete(item.id)}
                                                >
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
                        <p>Showing 1 to {filteredSurat.length} of {filteredSurat.length} entries</p>
                        <div className="flex border border-gray-300 rounded shadow-sm overflow-hidden mt-4 md:mt-0">
                            <button className="px-4 py-2 hover:bg-gray-100 transition text-gray-400" disabled>Previous</button>
                            <button className="px-4 py-2 bg-violet-600 text-white font-bold">1</button>
                            <button className="px-4 py-2 border-l border-gray-300 hover:bg-gray-100 transition text-gray-400" disabled>Next</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL TAMBAH & EDIT SURAT */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fadeIn">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
                        <div className="flex justify-between items-center bg-gray-50 border-b p-4">
                            <h3 className="font-semibold text-lg">
                                <i className={isEditMode ? "ri-edit-box-line mr-1" : "ri-add-circle-line mr-1"}></i>
                                {isEditMode ? 'Edit Arsip Surat' : 'Tambah Arsip Surat'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-white text-xl hover:text-gray-200">
                                <i className="ri-close-line"></i>
                            </button>
                        </div>

                        {/* Body Form Modal */}
                        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-sm text-gray-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium mb-1">Nomor Surat</label>
                                    <input
                                        type="text"
                                        name="nomor_surat"
                                        value={formData.nomor_surat}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-violet-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Jenis Surat</label>
                                    <select
                                        name="jenis_surat"
                                        value={formData.jenis_surat}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-violet-500 outline-none"
                                    >
                                        <option value="Masuk">Surat Masuk</option>
                                        <option value="Keluar">Surat Keluar</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Perihal / Judul Surat *</label>
                                <textarea
                                    name="perihal"
                                    value={formData.perihal}
                                    onChange={handleInputChange}
                                    required rows="2"
                                    className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-violet-500 outline-none"
                                    placeholder="Isi"
                                >
                                </textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium mb-1">Tanggal Surat</label>
                                    <input
                                        type="date"
                                        name="tgl_surat"
                                        value={formData.tgl_surat}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-violet-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Tanggal Terima</label>
                                    <input
                                        type="date"
                                        name="tgl_terima"
                                        value={formData.tgl_terima}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-violet-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium mb-1">File Dokumen Surat (.pdf, .jpg, max 5MB)</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full text-xs border border-gray-300 rounded p-1.5 bg-gray-50 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Keterangan Tambahan</label>
                                <input
                                    type="text"
                                    name="keterangan"
                                    value={formData.keterangan}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-violet-500 outline-none"
                                    placeholder="Catatan opsional..."
                                />
                            </div>

                            <div className="pt-4 border-t flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-medium flex items-center gap-1">
                                    <i className="ri-save-line"></i> Simpan Arsip
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuratMenyurat;