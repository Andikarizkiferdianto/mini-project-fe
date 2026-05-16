import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import Swal from "sweetalert2";

const API = "http://localhost:8000/api/penerimaan/jenis";

const JenisPenerimaan = () => {

    const [data, setData] = useState([]);

    const [form, setForm] = useState({
        akun_harta: "",
        akun_pendapatan: "",
        kode_penerimaan: "",
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
            akun_harta: "",
            akun_pendapatan: "",
            kode_penerimaan: "",
            nama_akun: "",
            jenis: "Dengan Pembatasan",
            keterangan: "",
            status: "Aktif"
        });

        setIsEdit(false);
        setSelectedId(null);
    };

    const handleSubmit = async () => {

        if (
            !form.akun_harta ||
            !form.akun_pendapatan ||
            !form.kode_penerimaan ||
            !form.nama_akun ||
            !form.jenis ||
            !form.status
        ) {
            Swal.fire(
                "Warning",
                "Semua field wajib diisi",
                "warning"
            );
            return;
        }

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
            akun_harta: item.akun_harta,
            akun_pendapatan: item.akun_pendapatan,
            kode_penerimaan: item.kode_penerimaan,
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

                const data = await res.json();

                Swal.fire(
                    "Sukses",
                    data.message,
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
                    Jenis Penerimaan
                </h1>

                {/* FORM */}
                <div className="bg-white border border-gray-200 rounded-lg shadow p-4">

                    <h2 className="text-lg font-semibold mb-4">
                        {isEdit
                            ? "Form Edit Jenis Penerimaan"
                            : "Form Tambah Jenis Penerimaan"}
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        {/* Kiri */}
                        <div className="space-y-3">

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

                                    <option value="1.0.2 - Kas di Bank">
                                        1.0.2 - Kas di Bank
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm">
                                    Akun Pendapatan
                                </label>

                                <select
                                    value={form.akun_pendapatan}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            akun_pendapatan: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                >
                                    <option value="">
                                        Pilih Akun Pendapatan
                                    </option>

                                    <option value="4.0.4 - Pendapatan BOS">
                                        4.0.4 - Pendapatan BOS
                                    </option>

                                    <option value="4.0.5 - Pendapatan SPP">
                                        4.0.5 - Pendapatan SPP
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm">
                                    Kode Akun Penerimaan
                                </label>

                                <input
                                    type="text"
                                    value={form.kode_penerimaan}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            kode_penerimaan: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">
                                    Nama Akun Penerimaan
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
                                    <option value="Dengan Pembatasan">
                                        Dengan Pembatasan
                                    </option>

                                    <option value="Tanpa Pembatasan">
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

                            <div className="flex gap-2 pt-2">

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
                        Data Jenis Penerimaan
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
                                    <th className="px-3 py-2">Akun Harta</th>
                                    <th className="px-3 py-2">Akun Pendapatan</th>
                                    <th className="px-3 py-2">Kode Penerimaan</th>
                                    <th className="px-3 py-2">Nama Akun</th>
                                    <th className="px-3 py-2">Jenis</th>
                                    <th className="px-3 py-2">Keterangan</th>
                                    <th className="px-3 py-2">Status</th>
                                    <th className="px-3 py-2">Aksi</th>
                                </tr>

                            </thead>

                            <tbody>

                                {data.map((item, index) => (

                                    <tr
                                        key={item.id}
                                        className="border-t text-center"
                                    >

                                        <td className="px-3 py-2">
                                            {index + 1}
                                        </td>

                                        <td className="px-3 py-2">
                                            {item.akun_harta}
                                        </td>

                                        <td className="px-3 py-2">
                                            {item.akun_pendapatan}
                                        </td>

                                        <td className="px-3 py-2">
                                            {item.kode_penerimaan}
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

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default JenisPenerimaan;