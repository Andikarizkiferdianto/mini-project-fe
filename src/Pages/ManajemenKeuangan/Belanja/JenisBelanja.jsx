import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import Swal from "sweetalert2";

const API = "http://localhost:8000/api/belanja/jenis";

const JenisBelanja = () => {

    const [data, setData] = useState([]);

    const [form, setForm] = useState({
        akun_belanja: "",
        akun_harta: "",
        kode_akun: "",
        nama_akun: "",
        jenis: "Dengan Pembatasan",
        keterangan: "",
        status: "Aktif"
    });

    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchData = async () => {
        try {
            const res = await fetch(API);
            const result = await res.json();

            setData(result.data || []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setForm({
            akun_belanja: "",
            akun_harta: "",
            kode_akun: "",
            nama_akun: "",
            jenis: "Dengan Pembatasan",
            keterangan: "",
            status: "Aktif"
        });

        setIsEdit(false);
        setSelectedId(null);
    };

    const handleSubmit = async () => {
        try {

            const url = isEdit
                ? `${API}/${selectedId}`
                : API;

            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const result = await res.json();

            if (!res.ok) {
                Swal.fire(
                    "Error",
                    result.message,
                    "error"
                );
                return;
            }

            Swal.fire(
                "Sukses",
                result.message,
                "success"
            );

            resetForm();
            fetchData();

        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (item) => {
        setForm({
            akun_belanja: item.akun_belanja,
            akun_harta: item.akun_harta,
            kode_akun: item.kode_akun,
            nama_akun: item.nama_akun,
            jenis: item.jenis,
            keterangan: item.keterangan,
            status: item.status
        });

        setSelectedId(item.id);
        setIsEdit(true);
    };

    const handleDelete = async (id) => {

        Swal.fire({
            title: "Yakin hapus data?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus"
        }).then(async (result) => {

            if (result.isConfirmed) {

                const res = await fetch(`${API}/${id}`, {
                    method: "DELETE"
                });

                const resultDelete = await res.json();

                Swal.fire(
                    "Sukses",
                    resultDelete.message,
                    "success"
                );

                fetchData();
            }

        });
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                {/* Title */}
                <h1 className="text-xl font-semibold">
                    Jenis Belanja
                </h1>

                {/* FORM */}
                <div className="bg-white border border-gray-200 rounded-lg shadow p-4">

                    <h2 className="text-lg font-semibold mb-4">
                        {isEdit
                            ? "Form Edit Jenis Belanja"
                            : "Form Tambah Jenis Belanja"}
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        {/* Kiri */}
                        <div className="space-y-3">

                            <div>
                                <label className="text-sm">
                                    Akun Belanja
                                </label>

                                <select
                                    value={form.akun_belanja}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            akun_belanja: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="">
                                        Pilih Akun Belanja
                                    </option>

                                    <option value="5.0.9 - Beban Gaji Guru dan Karyawan">
                                        5.0.9 - Beban Gaji Guru dan Karyawan
                                    </option>

                                    <option value="5.0.1 - Beban Lainnya">
                                        5.0.1 - Beban Lainnya
                                    </option>

                                    <option value="5.0.2 - Beban Operasional Guru">
                                        5.0.2 - Beban Operasional Guru
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm">
                                    Akun Harta
                                </label>

                                <select
                                    value={form.akun_harta}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            akun_harta: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                >
                                    <option value="">
                                        Pilih Akun Harta
                                    </option>

                                    <option value="1.0.1 - Kas">
                                        1.0.1 - Kas
                                    </option>

                                    <option value="1.0.2 - Kas Di Bank">
                                        1.0.2 - Kas Di Bank
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm">
                                    Kode Akun Belanja
                                </label>

                                <input
                                    type="text"
                                    value={form.kode_akun}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            kode_akun: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">
                                    Nama Akun Belanja
                                </label>

                                <input
                                    type="text"
                                    value={form.nama_akun}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            nama_akun: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                />
                            </div>

                        </div>

                        {/* Kanan */}
                        <div className="space-y-3">

                            <div>
                                <label className="text-sm">
                                    Jenis
                                </label>

                                <select
                                    value={form.jenis}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            jenis: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                >
                                    <option>
                                        Dengan Pembatasan
                                    </option>

                                    <option>
                                        Tanpa Pembatasan
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm">
                                    Keterangan
                                </label>

                                <input
                                    type="text"
                                    value={form.keterangan}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            keterangan: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">
                                    Status
                                </label>

                                <select
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            status: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                >
                                    <option value="Aktif">
                                        Aktif
                                    </option>

                                    <option value="Nonaktif">
                                        Nonaktif
                                    </option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">

                                {isEdit && (
                                    <button
                                        onClick={resetForm}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm"
                                    >
                                        Kembali
                                    </button>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                                >
                                    {isEdit ? "Update" : "Submit"}
                                </button>

                            </div>

                        </div>
                    </div>

                </div>

                {/* TABLE */}
                <div className="bg-white rounded-lg shadow p-4">

                    <h2 className="text-lg font-semibold mb-4">
                        Data Jenis Belanja
                    </h2>

                    <div className="flex justify-between items-center mb-3">

                        <div className="flex gap-2">
                            <button className="border px-3 py-1 text-xs rounded">
                                Copy
                            </button>

                            <button className="border px-3 py-1 text-xs rounded">
                                CSV
                            </button>

                            <button className="border px-3 py-1 text-xs rounded">
                                Excel
                            </button>

                            <button className="border px-3 py-1 text-xs rounded">
                                PDF
                            </button>

                            <button className="border px-3 py-1 text-xs rounded">
                                Print
                            </button>
                        </div>

                        <div className="flex items-center gap-2">

                            <span className="text-sm">
                                Search:
                            </span>

                            <div className="flex items-center border rounded px-2">
                                <Search size={16} />

                                <input
                                    type="text"
                                    className="outline-none px-2 py-1 text-sm"
                                />
                            </div>

                        </div>

                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">

                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">

                            <thead className="bg-violet-600 text-white text-center">

                                <tr>
                                    <th className="px-3 py-2">No</th>
                                    <th className="px-3 py-2">Akun Belanja</th>
                                    <th className="px-3 py-2">Akun Harta</th>
                                    <th className="px-3 py-2">Kode Belanja</th>
                                    <th className="px-3 py-2">Nama Akun</th>
                                    <th className="px-3 py-2">Jenis</th>
                                    <th className="px-3 py-2">Keterangan</th>
                                    <th className="px-3 py-2">Status</th>
                                    <th className="px-3 py-2">Aksi</th>
                                </tr>

                            </thead>

                            <tbody>

                                {data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="border-t text-center"
                                        >
                                            <td className="px-3 py-2">
                                                {index + 1}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.akun_belanja}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.akun_harta}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.kode_akun}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.nama_akun}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.jenis}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.keterangan}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.status}
                                            </td>

                                            <td className="px-3 py-2 flex justify-center gap-2">

                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="bg-sky-100 text-sky-600 px-2 py-1 rounded"
                                                >
                                                    <i className="ri-edit-line"></i>
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="bg-red-100 text-red-600 px-2 py-1 rounded"
                                                >
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="text-center py-4"
                                        >
                                            Tidak ada data
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default JenisBelanja;