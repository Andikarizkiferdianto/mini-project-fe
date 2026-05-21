import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DataJenisGuru = () => {
    const [activeTab, setActiveTab] = useState('guru');
    const [listGuru, setListGuru] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [formData, setFormData] = useState({
        tipe: 'GURU', nama: '', nip: '', jabatan: '', no_hp: '', email: '', status: 'Aktif'
    });

    const fetchDataGuru = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/data-guru-dan-karyawan?tipe=GURU');
            const result = await response.json();
            if (result.status === 'success') {
                setListGuru(result.data);
            }
        } catch (error) {
            console.error("Gagal mengambil data guru:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataGuru();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data guru yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            customClass: {
                popup: 'rounded-xl font-sans text-sm'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:8000/api/data-guru-dan-karyawan/${id}`, {
                        method: 'DELETE'
                    });
                    const resData = await response.json();
                    if (resData.status === 'success') {
                        Swal.fire({
                            title: 'Terhapus!',
                            text: resData.message,
                            icon: 'success',
                            confirmButtonColor: '#7c3aed'
                        });
                        fetchDataGuru();
                    }
                } catch (error) {
                    Swal.fire('Error!', 'Gagal menghapus data kepegawaian.', 'error');
                }
            }
        });
    };

    const openAddModal = () => {
        setIsEdit(false);
        setFormData({ tipe: 'GURU', nama: '', nip: '', jabatan: '', no_hp: '', email: '', status: 'Aktif' });
        setShowModal(true);
    };

    const openEditModal = (guru) => {
        setIsEdit(true);
        setSelectedId(guru.id);
        setFormData({
            tipe: guru.tipe, nama: guru.nama, nip: guru.nip, jabatan: guru.jabatan, no_hp: guru.no_hp, email: guru.email, status: guru.status
        });
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const url = isEdit
            ? `http://localhost:8000/api/data-guru-dan-karyawan/${selectedId}`
            : 'http://localhost:8000/api/data-guru-dan-karyawan';
        const method = isEdit ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (result.status === 'success') {
                setShowModal(false);
                Swal.fire({
                    title: 'Berhasil!',
                    text: result.message,
                    icon: 'success',
                    confirmButtonColor: '#7c3aed',
                    customClass: { popup: 'rounded-xl' }
                });
                fetchDataGuru();
            } else {
                Swal.fire('Gagal!', result.message, 'error');
            }
        } catch (error) {
            Swal.fire('Sistem Error!', 'Terjadi kegagalan koneksi backend.', 'error');
        }
    };

    const filteredGuru = listGuru.filter(item =>
        item.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nip?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.jabatan?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex bg-gray-100 min-h-screen font-sans">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">
                <div className="bg-violet-600 p-3 rounded-t-lg flex flex-col md:flex-row justify-between items-center shadow-md gap-3">
                    <h2 className="text-white font-bold flex items-center gap-2 text-lg">
                        <i className="ri-group-fill"></i> Data Guru
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        <button className="bg-white text-black text-xs px-5 py-3 rounded flex items-center gap-1 hover:bg-gray-100 transition font-medium" onClick={openAddModal}>
                            <i className="ri-add-line"></i> Tambah Guru
                        </button>
                    </div>
                </div>

                <div className="bg-white p-4 shadow rounded-b-lg border border-gray-200">
                    <div className="flex w-full mb-6 border border-violet-600 rounded overflow-hidden">
                        <button onClick={() => setActiveTab('guru')} className={`flex-1 py-2 text-sm font-bold flex justify-center items-center gap-2 transition ${activeTab === 'guru' ? 'bg-violet-600 text-white' : 'bg-white text-violet-600'}`}>
                            <i className="ri-user-received-2-fill"></i> Guru
                        </button>
                        <button onClick={() => navigate("/manajemen-kepegawaian/data-pegawai")} className="flex-1 py-3 text-sm font-bold bg-white text-violet-600 hover:bg-gray-50">
                            <i className="ri-user-settings-fill mr-2"></i> Pegawai
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-end mb-4 gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Search:</label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-violet-500 w-48 md:w-64" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-3 w-12">No</th>
                                    <th className="p-3">Nama</th>
                                    <th className="p-3">NIP</th>
                                    <th className="p-3">Jabatan</th>
                                    <th className="p-3">No HP</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3 text-center">Status</th>
                                    <th className="p-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="8" className="p-4 text-center text-gray-500">Loading data...</td></tr>
                                ) : filteredGuru.length === 0 ? (
                                    <tr><td colSpan="8" className="p-4 text-center text-gray-500">Tidak ada data guru ditemukan.</td></tr>
                                ) : (
                                    filteredGuru.map((guru, index) => (
                                        <tr key={guru.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-3 text-center">{index + 1}</td>
                                            <td className="p-3 font-semibold text-gray-800">{guru.nama}</td>
                                            <td className="p-3">{guru.nip}</td>
                                            <td className="p-3">{guru.jabatan || '-'}</td>
                                            <td className="p-3">{guru.no_hp}</td>
                                            <td className="p-3">{guru.email}</td>
                                            <td className="p-3 text-center">
                                                <span className={`px-2 py-0.5 text-xs rounded-full ${guru.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {guru.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-center flex justify-center gap-3">
                                                <button
                                                    onClick={() => openEditModal(guru)}
                                                    className="text-blue-600 hover:text-blue-800 transition">
                                                    <i className="ri-edit-line text-lg"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(guru.id)}
                                                    className="text-red-500 hover:text-red-700 transition">
                                                    <i className="ri-delete-bin-line text-lg"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MODAL FORM TAMBAH / EDIT */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fadeIn">
                    <div className="bg-white w-full max-w-lg rounded-lg shadow-xl overflow-hidden">
                        <div className="flex justify-between items-center bg-gray-50 border-b p-4">
                            <h3 className="text-base flex items-center gap-1"><i className="ri-edit-circle-line"></i> {isEdit ? 'Edit Data Guru' : 'Tambah Data Guru'}</h3>
                            <button onClick={() => setShowModal(false)} className="hover:bg-green-700 p-1 rounded-full"><i className="ri-close-line text-xl"></i></button>
                        </div>
                        <form onSubmit={handleSave} className="p-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Lengkap</label>
                                <input type="text" required value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-green-200 focus:border-violet-600 outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">NIP</label>
                                <input type="text" value={formData.nip} onChange={(e) => setFormData({ ...formData, nip: e.target.value })} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-200 focus:border-violet-600 outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Jabatan / Guru Mapel</label>
                                <input type="text" value={formData.jabatan} onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-200 focus:border-violet-600 outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">No HP</label>
                                <input type="text" value={formData.no_hp} onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-200 focus:border-violet-600 outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-200 focus:border-violet-600 outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Status Keaktifan</label>
                                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-200 focus:border-violet-600 outline-none transition">
                                    <option value="Aktif">Aktif</option>
                                    <option value="Nonaktif">Nonaktif</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition">Batal</button>
                                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition shadow-md">Simpan Data</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataJenisGuru;