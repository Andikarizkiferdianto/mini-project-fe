import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Swal from "sweetalert2";

const API = "http://localhost:8000/api/belanja/transaksi";

const TransaksiBelanja = () => {

    const [data, setData] = useState([]);

    const [form, setForm] = useState({
        jenis_belanja: "",
        bidang: "",
        penerima: "",
        sumber: "",
        tanggal: "",
        menyetujui: "",
        nominal: "",
        keterangan: ""
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
            jenis_belanja: "",
            bidang: "",
            penerima: "",
            sumber: "",
            tanggal: "",
            menyetujui: "",
            nominal: "",
            keterangan: ""
        });

        setIsEdit(false);
        setSelectedId(null);
    };

    const handleSubmit = async () => {

        if (
            !form.jenis_belanja ||
            !form.bidang ||
            !form.penerima ||
            !form.sumber ||
            !form.tanggal ||
            !form.nominal ||
            !form.menyetujui
        ) {
            Swal.fire(
                "Warning",
                "Semua data wajib diisi",
                "warning"
            );
            return;
        }

        try {

            const url = isEdit
                ? `${API}/${selectedId}`
                : API;

            const method = isEdit
                ? "PUT"
                : "POST";

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
            jenis_belanja: item.jenis_belanja,
            bidang: item.bidang,
            penerima: item.penerima,
            sumber: item.sumber,
            tanggal: item.tanggal?.split("T")[0],
            menyetujui: item.menyetujui,
            nominal: item.nominal,
            keterangan: item.keterangan
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

                {/* TITLE */}
                <h1 className="text-3xl font-semibold">
                    Transaksi Belanja
                </h1>

                {/* FORM */}
                <div className="bg-white border border-gray-200 rounded-lg shadow p-4">

                    <h2 className="text-lg font-semibold mb-4">
                        {isEdit
                            ? "Form Edit Transaksi Belanja"
                            : "Form Tambah Transaksi Belanja"}
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        {/* KIRI */}
                        <div className="space-y-4">

                            <div>
                                <label className="text-sm">
                                    Jenis Belanja
                                </label>

                                <select
                                    value={form.jenis_belanja}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            jenis_belanja: e.target.value
                                        })
                                    }
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-3 text-sm"
                                >
                                    <option value="">
                                        -- Pilih Jenis Belanja --
                                    </option>

                                    <option value="Beban Lain-Lain">
                                        Beban Lain-Lain
                                    </option>

                                    <option value="Beban Operasional Guru">
                                        Beban Operasional Guru
                                    </option>

                                    <option value="Bisyarah Guru">
                                        Bisyarah Guru
                                    </option>

                                </select>
                            </div>

                            <div>
                                <label className="text-sm">
                                    Bidang / Divisi
                                </label>

                                <input
                                    type="text"
                                    value={form.bidang}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            bidang: e.target.value
                                        })
                                    }
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">
                                    Penerima
                                </label>

                                <input
                                    type="text"
                                    value={form.penerima}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            penerima: e.target.value
                                        })
                                    }
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">
                                    Sumber
                                </label>

                                <input
                                    type="text"
                                    value={form.sumber}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            sumber: e.target.value
                                        })
                                    }
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-3 text-sm"
                                />
                            </div>

                        </div>

                        {/* KANAN */}
                        <div className="space-y-4">

                            <div>
                                <label className="block text-sm mb-1">
                                    Tanggal Belanja
                                </label>

                                <input
                                    type="date"
                                    value={form.tanggal}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            tanggal: e.target.value
                                        })
                                    }
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="text-sm">
                                    Nominal
                                </label>

                                <input
                                    type="number"
                                    value={form.nominal}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            nominal: e.target.value
                                        })
                                    }
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm">
                                    Menyetujui
                                </label>

                                <input
                                    type="text"
                                    value={form.menyetujui}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            menyetujui: e.target.value
                                        })
                                    }
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-3 text-sm"
                                />
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
                                    className="w-full mt-2 border border-gray-200 rounded px-3 py-6 text-sm"
                                />
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
                        Daftar Transaksi Belanja
                    </h2>

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">

                            <thead className="bg-violet-600 text-white text-center">

                                <tr>
                                    <th className="px-3 py-2">No</th>
                                    <th className="px-3 py-2">Kode Transaksi</th>
                                    <th className="px-3 py-2">Jenis Belanja</th>
                                    <th className="px-3 py-2">Bidang</th>
                                    <th className="px-3 py-2">Penerima</th>
                                    <th className="px-3 py-2">Sumber</th>
                                    <th className="px-3 py-2">Tanggal</th>
                                    <th className="px-3 py-2">Menyetujui</th>
                                    <th className="px-3 py-2">Keterangan</th>
                                    <th className="px-3 py-2">Nominal</th>
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
                                                {item.kode_transaksi}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.jenis_belanja}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.bidang}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.penerima}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.sumber}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.tanggal?.split("T")[0]}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.menyetujui}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.keterangan}
                                            </td>

                                            <td className="px-3 py-2">
                                                Rp {Number(item.nominal).toLocaleString("id-ID")}
                                            </td>

                                            <td className="px-3 py-2 flex justify-center gap-2">

                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="bg-sky-100 text-sky-600 px-2 py-2 rounded"
                                                >
                                                    <i className="ri-edit-line"></i>
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="bg-red-100 text-red-600 px-2 py-2 rounded"
                                                >
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>

                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="11"
                                            className="py-4 text-center text-gray-500"
                                        >
                                            Data transaksi belanja kosong
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

export default TransaksiBelanja;