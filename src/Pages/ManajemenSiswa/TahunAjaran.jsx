import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar";

const API = "http://localhost:8000/api/tahun-ajaran"; 


const TahunAjaran = () => {
    const [TahunAjaran, setTahunAjaran] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        tahun: "",
        nama: "",
        is_active: false
    });
    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchData = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            setTahunAjaran(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openTambah = () => {
        setForm({
            nama: "",
            tahun: "",
            is_active: false
        });
        console.log("KIRIM:", {
            nama: form.nama,
            tahun: form.tahun,
            is_active: form.is_active
        });
        setIsEdit(false);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        if (!form.tahun?.trim() || !form.nama?.trim()) {
            Swal.fire("Error", "Semua field wajib diisi!", "error");
            return;
        }

        try {
            const API = "http://localhost:8000/api/tahun-ajaran";

            const url = isEdit
                ? `${API}/${selectedId}`
                : API;

            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nama: form.nama?.trim(),
                    tahun: form.tahun.toString(),
                    is_active: form.is_active ?? false
                })
            });
            let result = {};
            try {
                result = await res.json();
            } catch {
                result = { message: "Server tidak kirim response" };
            }

            if (!res.ok) {
                Swal.fire("Error", result.message || "Gagal", "error");
                return;
            }

            Swal.fire("Sukses", result.message, "success");

            setShowModal(false);
            setForm({
                nama: "",
                tahun: "",
                is_active: false
            });
            setIsEdit(false);
            setSelectedId(null);

            fetchData();

        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = (id, nama) => {
        Swal.fire({
            title: "Yakin hapus?",
            text: `Data tahun ajaran akan dihapus`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`${API}/${id}`, {
                    method: "DELETE"
                });

                const data = await res.json();
                Swal.fire("Sukses", data.message, "success");
                fetchData();
            }
        });
    };

    const handleEdit = (data) => {
        setForm({
            nama: data.nama,
            tahun: data.tahun,
            is_active: data.is_active
        });

        setSelectedId(data.id);
        setIsEdit(true);
        setShowModal(true);
    };


    const handleToggle = async (id, currentStatus) => {
        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                is_active: !currentStatus
            })
        });

        fetchData();
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6 bg-gray-100 min-h-screen pt-20">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold text-violet-700 flex items-center gap-2">
                        <i className="ri-building-4-fill"></i>
                        Tahun Ajaran
                    </h1>

                    <button
                        onClick={openTambah}
                        className="text-white px-4 py-2 rounded bg-violet-600 hover:bg-violet-700"
                    >
                        + Tambah
                    </button>
                </div>

                {/* tambah data tahun ajaran */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                        <div className="bg-white w-[500px] rounded-lg shadow-lg overflow-hidden">

                            <div className="bg-violet-600 text-white flex justify-between items-center px-4 py-3">
                                <h2 className="font-semibold text-lg">
                                    {isEdit ? "✏️ Edit Tahun Ajaran" : "+ Tambah Tahun Ajaran"}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-white text-xl"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-5 space-y-4">
                                <input
                                    type="text"
                                    placeholder="2024/2025"
                                    value={form.nama}
                                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />

                                <input
                                    type="number"
                                    placeholder="2024"
                                    value={form.tahun}
                                    onChange={(e) => setForm({ ...form, tahun: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div className="flex justify-end gap-2 px-5 pb-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    ✖ Batal
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    💾 Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* tabel */}
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-2">No</th>
                                    <th className="p-2">Tahun Ajaran</th>
                                    <th className="p-2">Tahun</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {TahunAjaran.map((w, i) => (
                                    <tr key={w.id} className="text-center border-t">
                                        <td className="p-2">{i + 1}</td>
                                        <td>{w.nama}</td>
                                        <td>{w.tahun}</td>
                                        <td>
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={w.is_active}
                                                    onChange={() => handleToggle(w.id, w.is_active)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 relative transition-all duration-300">
                                                    <div className="absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5">
                                                    </div>
                                                </div>
                                            </label>
                                        </td>
                                        <td className="p-2 flex justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(w)}
                                                className="p-2 bg-sky-100 text-sky-600 rounded"
                                            >
                                                <i className="ri-edit-2-line"></i>
                                            </button>

                                            <button
                                                onClick={() => handleDelete(w.id)}
                                                className="p-2 bg-red-100 text-red-600 rounded"
                                            >
                                                <i className="ri-delete-bin-6-line"></i>
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

export default TahunAjaran;