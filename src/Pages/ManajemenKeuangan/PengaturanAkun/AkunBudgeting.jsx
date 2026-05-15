import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../../../components/Sidebar";

const AkunBudgeting = () => {
    const [data, setData] = useState([]);
    const [options, setOptions] = useState({
        akun: [],
        tahun_ajaran: []
    });

    const [form, setForm] = useState({
        tahun_ajaran_id: "",
        akun_id: "",
        nominal: "",
        keterangan: ""
    });

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);

    // ================= GET DATA =================
    const getData = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/budgeting");
            const result = await res.json();

            if (result.status === "success") {
                setData(result.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // ================= GET OPTIONS =================
    const getOptions = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/budgeting/options");
            const result = await res.json();

            if (result.status === "success") {
                setOptions(result.options);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
        getOptions();
    }, []);

    // ================= HANDLE INPUT =================
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // ================= RESET FORM =================
    const resetForm = () => {
        setForm({
            tahun_ajaran_id: "",
            akun_id: "",
            nominal: "",
            keterangan: ""
        });

        setEditId(null);
    };

    // ================= SIMPAN DATA =================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const method = editId ? "PUT" : "POST";
            const url = editId
                ? `http://localhost:8000/api/budgeting/${editId}`
                : "http://localhost:8000/api/budgeting";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const result = await res.json();

            if (result.status === "success") {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: result.message,
                    timer: 1500,
                    showConfirmButton: false
                });

                getData();
                resetForm();
                setShowModal(false);
            } else {
                Swal.fire("Error", result.message, "error");
            }
        } catch (err) {
            console.log(err);
        }
    };

    // ================= EDIT =================
    const handleEdit = (item) => {
        setEditId(item.id);

        setForm({
            tahun_ajaran_id: item.tahun_ajaran_id,
            akun_id: item.akun_id,
            nominal: item.nominal,
            keterangan: item.keterangan
        });

        setShowModal(true);
    };

    // ================= DELETE =================
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Yakin hapus?",
            text: "Data akan dihapus permanen",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya"
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await fetch(`http://localhost:8000/api/budgeting/${id}`, {
                method: "DELETE"
            });

            const result = await res.json();

            if (result.status === "success") {
                Swal.fire("Berhasil", result.message, "success");
                getData();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6 overflow-x-auto">

                {/* HEADER PAGE */}
                <div className="flex items-center gap-2 text-gray-800">
                    <h2 className="text-2xl font-semibold">
                        Data Akun Budgeting
                    </h2>
                </div>

                {/* CARD */}
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">

                    {/* HEADER CARD */}
                    <div className="flex justify-between items-center border-b border-gray-300 px-4 py-3 bg-gray-50">

                        <h2 className="text-xl font-medium text-gray-800">
                            Daftar Akun Budgeting
                        </h2>

                        <button
                            onClick={() => {
                                resetForm();
                                setShowModal(true);
                            }}
                            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded"
                        >
                            + Tambah
                        </button>
                    </div>

                    {/* TABEL */}
                    <div className="p-4 overflow-x-auto">

                        <table className="w-full border border-gray-300 text-sm">

                            {/* HEADER */}
                            <thead className="bg-violet-600 text-white">
                                <tr>
                                    <th className="border px-4 py-3">No</th>
                                    <th className="border px-4 py-3">Tahun Ajaran</th>
                                    <th className="border px-4 py-3">Akun</th>
                                    <th className="border px-4 py-3">Nominal</th>
                                    <th className="border px-4 py-3">Keterangan</th>
                                    <th className="border px-4 py-3">Aksi</th>
                                </tr>
                            </thead>

                            {/* BODY */}
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50">

                                            <td className="border px-4 py-3 text-center">
                                                {index + 1}
                                            </td>

                                            <td className="border px-4 py-3">
                                                {item.tahun_ajaran_id}
                                            </td>

                                            <td className="border px-4 py-3">
                                                {item.akun_id}
                                            </td>

                                            <td className="border px-4 py-3">
                                                Rp {Number(item.nominal).toLocaleString("id-ID")}
                                            </td>

                                            <td className="border px-4 py-3">
                                                {item.keterangan}
                                            </td>

                                            <td className="border px-4 py-3">
                                                <div className="flex gap-2 justify-center">

                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                                    >
                                                        Hapus
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="border px-4 py-4 text-center text-gray-500"
                                        >
                                            Tidak ada data
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>

                    </div>
                </div>

                {/* MODAL */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                        <div className="bg-white rounded-lg w-full max-w-lg p-6">

                            <h2 className="text-xl font-semibold mb-4">
                                {editId ? "Edit Budgeting" : "Tambah Budgeting"}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">

                                {/* TAHUN AJARAN */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">
                                        Tahun Ajaran
                                    </label>

                                    <select
                                        name="tahun_ajaran_id"
                                        value={form.tahun_ajaran_id}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    >
                                        <option value="">-- Pilih --</option>

                                        {options.tahun_ajaran.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* AKUN */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">
                                        Akun
                                    </label>

                                    <select
                                        name="akun_id"
                                        value={form.akun_id}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    >
                                        <option value="">-- Pilih --</option>

                                        {options.akun.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* NOMINAL */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">
                                        Nominal
                                    </label>

                                    <input
                                        type="number"
                                        name="nominal"
                                        value={form.nominal}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                </div>

                                {/* KETERANGAN */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">
                                        Keterangan
                                    </label>

                                    <textarea
                                        name="keterangan"
                                        value={form.keterangan}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>

                                {/* BUTTON */}
                                <div className="flex justify-end gap-2 pt-3">

                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 border rounded"
                                    >
                                        Batal
                                    </button>

                                    <button
                                        type="submit"
                                        className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded"
                                    >
                                        Simpan
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

export default AkunBudgeting;