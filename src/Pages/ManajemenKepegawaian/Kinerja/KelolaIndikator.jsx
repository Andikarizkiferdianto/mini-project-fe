import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';
import Swal from 'sweetalert2';

const KelolaIndikator = () => {
    const [listIndikator, setListIndikator] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    
    const [formData, setFormData] = useState({
        nama_indikator: '',
        bobot: '',
        keterangan: ''
    });

     const fetchIndikator = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/kelola-indikator');
            const result = await response.json();
            if (result.status === 'success') {
                setListIndikator(result.data);
            }
        } catch (error) {
            console.error("Gagal mengambil data indikator:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIndikator();
    }, []);

     const openAddModal = () => {
        setIsEdit(false);
        setFormData({ nama_indikator: '', bobot: '', keterangan: '' });
        setShowModal(true);
    };

    const openEditModal = (data) => {
        setIsEdit(true);
        setSelectedId(data.id);
        setFormData({
            nama_indikator: data.nama_indikator,
            bobot: data.bobot,
            keterangan: data.keterangan || ''
        });
        setShowModal(true);
    };

     const handleSave = async (e) => {
        e.preventDefault();
        const url = isEdit 
            ? `http://localhost:8000/api/kelola-indikator/${selectedId}`
            : 'http://localhost:8000/api/kelola-indikator';
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
                    customClass: { popup: 'rounded-xl font-sans' }
                });
                fetchIndikator();
            } else {
                Swal.fire('Gagal!', result.message, 'error');
            }
        } catch (error) {
            Swal.fire('Sistem Error!', 'Gagal menghubungkan ke server.', 'error');
        }
    };

     const handleDelete = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Indikator penilaian ini akan dihapus secara permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            customClass: { popup: 'rounded-xl font-sans text-sm' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:8000/api/kelola-indikator/${id}`, {
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
                        fetchIndikator();
                    }
                } catch (error) {
                    Swal.fire('Error!', 'Gagal memproses penghapusan.', 'error');
                }
            }
        });
    };

    return (
        <div className="flex bg-gray-100 min-h-screen font-sans">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">
                 <div className="bg-violet-600 p-3 rounded-t-lg flex justify-between items-center shadow-md">
                    <h2 className="text-white font-bold flex items-center gap-2 text-base md:text-lg">
                        <i className="ri-list-check text-xl"></i> Kelola Indikator Kerja
                    </h2>
                    <button onClick={openAddModal} className="bg-white text-black font-semibold text-xs px-4 py-2.5 rounded flex items-center gap-1 hover:bg-gray-100 transition shadow">
                        <i className="ri-add-line"></i> Tambah Indikator
                    </button>
                </div>

                 <div className="bg-white p-5 shadow rounded-b-lg border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-3 w-12">No</th>
                                    <th className="p-3 text-left">Nama Indikator</th>
                                    <th className="p-3 w-28">Bobot (%)</th>
                                    <th className="p-3 text-left">Keterangan</th>
                                    <th className="p-3 w-28 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800">
                                {loading ? (
                                    <tr><td colSpan="5" className="p-4 text-center text-gray-500">Memuat data indikator...</td></tr>
                                ) : listIndikator.length === 0 ? (
                                    <tr><td colSpan="5" className="p-4 text-center text-gray-500">Belum ada indikator penilaian kerja.</td></tr>
                                ) : (
                                    listIndikator.map((item, index) => (
                                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                            <td className="p-3 text-center">{index + 1}</td>
                                            <td className="p-3 font-semibold text-gray-800">{item.nama_indikator}</td>
                                            <td className="p-3 text-center bg-violet-50 font-bold text-green-700">{item.bobot}%</td>
                                            <td className="p-3 text-gray-600">{item.keterangan || '-'}</td>
                                            <td className="p-3 text-center flex justify-center gap-4">
                                                <button onClick={() => openEditModal(item)} className="text-blue-600 hover:text-blue-800 transition">
                                                    <i className="ri-edit-line text-lg"></i>
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 transition">
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

            {/* MODAL POPUP (TAMBAH / EDIT) */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fadeIn">
                        <div className="bg-white w-full max-w-lg rounded-lg shadow-xl overflow-hidden">
                            <div className="flex justify-between items-center bg-gray-50 border-b p-4">
                            <h3 className="text-base flex items-center gap-1">
                                <i className="ri-edit-circle-line"></i> {isEdit ? 'Edit Indikator Penilaian' : 'Tambah Indikator Baru'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="hover:bg-violet-700 p-1 rounded-full transition">
                                <i className="ri-close-line text-xl"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Indikator</label>
                                <input type="text" required value={formData.nama_indikator} onChange={(e) => setFormData({...formData, nama_indikator: e.target.value})} placeholder="Contoh: Kedisiplinan Kerja" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-200 focus:border-violet-600 outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Bobot Penilaian (%)</label>
                                <input type="number" required min="1" max="100" value={formData.bobot} onChange={(e) => setFormData({...formData, bobot: e.target.value})} placeholder="0 - 100" className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-200 focus:border-violet-600 outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Keterangan Parameter</label>
                                <textarea rows="3" value={formData.keterangan} onChange={(e) => setFormData({...formData, keterangan: e.target.value})} placeholder="Tulis rincian penilaian singkat..." className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-200 focus:border-violet-600 outline-none transition resize-none"></textarea>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition">Batal</button>
                                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition shadow-md">Simpan Indikator</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KelolaIndikator;