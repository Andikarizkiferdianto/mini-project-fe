import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import Swal from "sweetalert2";

const API = "http://localhost:8000/api/jenis-pembayaran";

const JenisPembayaran = () => {
    const [data, setData] = useState([]);

    const [form, setForm] = useState({
        kode_akun: "",
        nama_pembayaran: "",
        akun_harta: "",
        akun_pendapatan: "",
        akun_hutang: "",
        tipe: "Bebas",
        status: "Aktif"
    });

    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchData = async () => {
        try {
            const res = await fetch(API);
            const result = await res.json();
            setData(result);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async () => {

    if (
        !form.kode_akun ||
        !form.nama_pembayaran ||
        !form.akun_harta ||
        !form.akun_pendapatan ||
        !form.akun_hutang ||
        !form.tipe ||
        !form.status
    ) {
        Swal.fire(
            "Peringatan",
            "Semua field wajib diisi!",
            "warning"
        );
        return;
    }

    try {
        const url = isEdit ? `${API}/${selectedId}` : API;

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
            Swal.fire("Error", result.error, "error");
            return;
        }

        Swal.fire(
            "Sukses",
            result.message,
            "success"
        );

        setForm({
            kode_akun: "",
            nama_pembayaran: "",
            akun_harta: "",
            akun_pendapatan: "",
            akun_hutang: "",
            tipe: "Bebas",
            status: "Aktif"
        });

        setIsEdit(false);
        setSelectedId(null);

        fetchData();

    } catch (err) {
        console.log(err);
    }
};

    const handleEdit = (item) => {
        setForm({
            kode_akun: item.kode_akun,
            nama_pembayaran: item.nama_pembayaran,
            akun_harta: item.akun_harta,
            akun_pendapatan: item.akun_pendapatan,
            akun_hutang: item.akun_hutang,
            tipe: item.tipe,
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
                    Jenis Pembayaran
                </h1>

                {/* FORM */}
                <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        {isEdit
                            ? "Form Edit Jenis Pembayaran"
                            : "Form Tambah Jenis Pembayaran"}
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        {/* KIRI */}
                        <div className="space-y-3">

                            <div>
                                <label className="text-sm">
                                    Kode Akun Pembayaran
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
                                    placeholder="Masukkan kode akun pembayaran"
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">
                                    Nama Akun Pembayaran
                                </label>

                                <input
                                    type="text"
                                    value={form.nama_pembayaran}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            nama_pembayaran: e.target.value
                                        })
                                    }
                                    placeholder="Masukkan nama akun pembayaran"
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">
                                    Tipe
                                </label>

                                <select
                                    value={form.tipe}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            tipe: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                                >
                                    <option>Bebas</option>
                                    <option>Bulanan</option>
                                </select>
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
                                    <option>Aktif</option>
                                    <option>Non-Aktif</option>
                                </select>
                            </div>

                            <div className="flex gap-2">

                                {isEdit && (
                                    <button
                                        onClick={() => {
                                            setIsEdit(false);
                                            setSelectedId(null);

                                            setForm({
                                                kode_akun: "",
                                                nama_pembayaran: "",
                                                akun_harta: "",
                                                akun_pendapatan: "",
                                                akun_hutang: "",
                                                tipe: "Bebas",
                                                status: "Aktif"
                                            });
                                        }}
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

                        {/* Kanan */}
                        <div className="space-y-3">

                            <div>
                                <label className="text-sm font-medium">Akun Harta</label>

                                <select
                                    value={form.akun_harta}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            akun_harta: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="">Pilih Akun Harta</option>
                                    <option value="1.0.1 - Kas">1.0.1 - Kas</option>
                                    <option value="1.0.2 - Kas di Bank">1.0.2 - Kas di Bank</option>
                                    <option value="2.0.2 - Pendapatan SPP">2.0.2 - Pendapatan SPP</option>
                                    <option value="4.0.4 - Pendapatan BOS">4.0.4 - Pendapatan BOS</option>
                                    <option value="4.0.6 - Pendapatan Kegiatan">4.0.6 - Pendapatan Kegiatan</option>
                                    <option value="4.1.4 - Utang Bank">4.1.4 - Utang Bank</option>
                                    <option value="4004 - Pendapatan Tunggakan">4004 - Pendapatan Tunggakan</option>
                                    <option value="5.0.1 - Beban Lainnya">5.0.1 - Beban Lainnya</option>
                                    <option value="5.0.2 - Beban Operasional Guru">5.0.2 - Beban Operasional Guru</option>
                                    <option value="5.0.9 - Beban Gaji Guru dan Karyawan">5.0.9 - Beban Gaji Guru dan Karyawan</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Akun Pendapatan</label>

                                <select
                                    value={form.akun_pendapatan}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            akun_pendapatan: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="">Pilih Akun Pendapatan</option>
                                    <option value="1.0.1 - Kas">1.0.1 - Kas</option>
                                    <option value="1.0.2 - Kas di Bank">1.0.2 - Kas di Bank</option>
                                    <option value="2.0.2 - Pendapatan SPP">2.0.2 - Pendapatan SPP</option>
                                    <option value="4.0.4 - Pendapatan BOS">4.0.4 - Pendapatan BOS</option>
                                    <option value="4.0.6 - Pendapatan Kegiatan">4.0.6 - Pendapatan Kegiatan</option>
                                    <option value="4.1.4 - Utang Bank">4.1.4 - Utang Bank</option>
                                    <option value="4004 - Pendapatan Tunggakan">4004 - Pendapatan Tunggakan</option>
                                    <option value="5.0.1 - Beban Lainnya">5.0.1 - Beban Lainnya</option>
                                    <option value="5.0.2 - Beban Operasional Guru">5.0.2 - Beban Operasional Guru</option>
                                    <option value="5.0.9 - Beban Gaji Guru dan Karyawan">5.0.9 - Beban Gaji Guru dan Karyawan</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Akun Hutang</label>

                                <select
                                    value={form.akun_hutang}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            akun_hutang: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="">Pilih Akun Hutang</option>
                                    <option value="1.0.1 - Kas">1.0.1 - Kas</option>
                                    <option value="1.0.2 - Kas di Bank">1.0.2 - Kas di Bank</option>
                                    <option value="2.0.2 - Pendapatan SPP">2.0.2 - Pendapatan SPP</option>
                                    <option value="4.0.4 - Pendapatan BOS">4.0.4 - Pendapatan BOS</option>
                                    <option value="4.0.6 - Pendapatan Kegiatan">4.0.6 - Pendapatan Kegiatan</option>
                                    <option value="4.1.4 - Utang Bank">4.1.4 - Utang Bank</option>
                                    <option value="4004 - Pendapatan Tunggakan">4004 - Pendapatan Tunggakan</option>
                                    <option value="5.0.1 - Beban Lainnya">5.0.1 - Beban Lainnya</option>
                                    <option value="5.0.2 - Beban Operasional Guru">5.0.2 - Beban Operasional Guru</option>
                                    <option value="5.0.9 - Beban Gaji Guru dan Karyawan">5.0.9 - Beban Gaji Guru dan Karyawan</option>
                                </select>
                            </div>

                        </div>

                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-lg shadow p-4">

                    <h2 className="text-sm font-semibold mb-4">
                        Data Jenis Pembayaran
                    </h2>

                    {/* TOP BAR */}
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

                    {/* TABLE */}
                    <div className="overflow-x-auto">

                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">

                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="px-3 py-2">No</th>
                                    <th className="px-3 py-2">Kode Akun</th>
                                    <th className="px-3 py-2">Nama Pembayaran</th>
                                    <th className="px-3 py-2">Akun Harta</th>
                                    <th className="px-3 py-2">Akun Pendapatan</th>
                                    <th className="px-3 py-2">Akun Hutang</th>
                                    <th className="px-3 py-2">Tipe</th>
                                    <th className="px-3 py-2">Status</th>
                                    <th className="px-3 py-2">Action</th>
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
                                            {item.kode_akun}
                                        </td>

                                        <td className="px-3 py-2">
                                            {item.nama_pembayaran}
                                        </td>

                                        <td className="px-3 py-2">
                                            {item.akun_harta}
                                        </td>

                                        <td className="px-3 py-2">
                                            {item.akun_pendapatan}
                                        </td>

                                        <td className="px-3 py-2">
                                            {item.akun_hutang}
                                        </td>

                                        <td className="px-3 py-2">
                                            {item.tipe}
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

export default JenisPembayaran;