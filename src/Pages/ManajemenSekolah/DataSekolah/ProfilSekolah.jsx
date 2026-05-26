import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import Swal from 'sweetalert2';
import 'remixicon/fonts/remixicon.css';

const ProfilSekolah = () => {

    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({
        nama_sekolah: '',
        npsn: '',
        alamat: '',
        telepon: '',
        email: '',
        website: '',
        kepala_sekolah: '',
        logo_sekolah: null
    });

    const [previewLogo, setPreviewLogo] = useState('');

    const fetchData = async () => {

        try {

            const response = await fetch(
                'http://localhost:8000/api/profil-sekolah'
            );

            const result = await response.json();

            if (result.status === 'success') {

                setFormData({
                    ...result.data,
                    logo_sekolah: null
                });

                if (result.data.logo_sekolah) {
                    setPreviewLogo(
                        `http://localhost:8000/uploads/logo/${result.data.logo_sekolah}`
                    );
                }
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async () => {

        try {

            const data = new FormData();

            data.append('nama_sekolah', formData.nama_sekolah);
            data.append('npsn', formData.npsn);
            data.append('alamat', formData.alamat);
            data.append('telepon', formData.telepon);
            data.append('email', formData.email);
            data.append('website', formData.website);
            data.append('kepala_sekolah', formData.kepala_sekolah);

            if (formData.logo_sekolah) {
                data.append('logo_sekolah', formData.logo_sekolah);
            }

            const response = await fetch(
                'http://localhost:8000/api/profil-sekolah',
                {
                    method: 'POST',
                    body: data
                }
            );

            const result = await response.json();

            if (result.status === 'success') {

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Profil sekolah berhasil diupdate!',
                    timer: 1500,
                    showConfirmButton: false
                });

                setEditMode(false);

                fetchData();
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-6 mb-6">

                        <div className="flex items-center gap-5">

                            <div className="w-24 h-24 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center bg-gray-50">

                                {previewLogo ? (
                                    <img
                                        src={previewLogo}
                                        alt="Logo"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <i className="ri-image-line text-3xl text-gray-400"></i>
                                )}

                            </div>

                            <div>

                                {editMode ? (
                                    <>
                                        <input
                                            type="text"
                                            value={formData.nama_sekolah}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    nama_sekolah: e.target.value
                                                })
                                            }
                                            className="border p-2 rounded w-full mb-2"
                                        />

                                        <input
                                            type="text"
                                            value={formData.npsn}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    npsn: e.target.value
                                                })
                                            }
                                            className="border p-2 rounded w-full"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <h1 className="text-3xl font-bold text-slate-800">
                                            {formData.nama_sekolah}
                                        </h1>

                                        <p className="text-sm text-gray-500 font-medium">
                                            NPSN: {formData.npsn}
                                        </p>
                                    </>
                                )}

                            </div>

                        </div>

                        {editMode ? (
                            <div className="flex gap-2 mt-4 md:mt-0">

                                <button
                                    onClick={() => setEditMode(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                                >
                                    Batal
                                </button>

                                <button
                                    onClick={handleSave}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                                >
                                    Simpan
                                </button>

                            </div>
                        ) : (
                            <button
                                onClick={() => setEditMode(true)}
                                className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm transition-colors"
                            >
                                <i className="ri-edit-box-line"></i>
                                Edit Profil
                            </button>
                        )}

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">

                        <div className="space-y-6">

                            <div>
                                <label className="font-bold text-slate-800">
                                    Alamat
                                </label>

                                {editMode ? (
                                    <textarea
                                        value={formData.alamat}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                alamat: e.target.value
                                            })
                                        }
                                        className="w-full border rounded p-2 mt-1"
                                    />
                                ) : (
                                    <p className="text-gray-600">
                                        {formData.alamat}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="font-bold text-slate-800">
                                    Email
                                </label>

                                {editMode ? (
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value
                                            })
                                        }
                                        className="w-full border rounded p-2 mt-1"
                                    />
                                ) : (
                                    <p className="text-gray-600">
                                        {formData.email}
                                    </p>
                                )}
                            </div>

                        </div>

                        <div className="space-y-6">

                            <div>
                                <label className="font-bold text-slate-800">
                                    Telepon
                                </label>

                                {editMode ? (
                                    <input
                                        type="text"
                                        value={formData.telepon}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                telepon: e.target.value
                                            })
                                        }
                                        className="w-full border rounded p-2 mt-1"
                                    />
                                ) : (
                                    <p className="text-gray-600">
                                        {formData.telepon}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="font-bold text-slate-800">
                                    Website
                                </label>

                                {editMode ? (
                                    <input
                                        type="text"
                                        value={formData.website}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                website: e.target.value
                                            })
                                        }
                                        className="w-full border rounded p-2 mt-1"
                                    />
                                ) : (
                                    <div>
                                        <a
                                            href={formData.website}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {formData.website}
                                        </a>
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className="md:col-span-2 space-y-4 border-t border-gray-100 pt-4">

                            <div>
                                <label className="font-bold text-slate-800">
                                    Kepala Sekolah
                                </label>

                                {editMode ? (
                                    <input
                                        type="text"
                                        value={formData.kepala_sekolah}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                kepala_sekolah: e.target.value
                                            })
                                        }
                                        className="w-full border rounded p-2 mt-1"
                                    />
                                ) : (
                                    <p className="text-gray-600">
                                        {formData.kepala_sekolah}
                                    </p>
                                )}
                            </div>

                            {editMode && (
                                <div>
                                    <label className="font-bold text-slate-800">
                                        Upload Logo
                                    </label>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {

                                            setFormData({
                                                ...formData,
                                                logo_sekolah: e.target.files[0]
                                            });

                                            setPreviewLogo(
                                                URL.createObjectURL(
                                                    e.target.files[0]
                                                )
                                            );
                                        }}
                                        className="w-full border rounded p-2 mt-1"
                                    />
                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProfilSekolah;