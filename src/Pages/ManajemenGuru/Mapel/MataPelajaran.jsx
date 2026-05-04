import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../../../components/Sidebar";

const API = "http://localhost:8000/api/mata-pelajaran";

const MataPelajaran = () => {
    const [mataPelajaran, setMataPelajaran] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        nama_mapel: ""
    });

    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchData = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();

            if (Array.isArray(data)) {
                setMataPelajaran(data);
            } else if (Array.isArray(data.data)) {
                setMataPelajaran(data.data);
            } else {
                setMataPelajaran([]); // fallback biar ga crash
            }
        } catch (err) {
            console.error(err);
            setMataPelajaran([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openTambah = () => {
        setForm({ nama_mapel: "" });
        setIsEdit(false);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        if (!form.nama_mapel.trim()) {
            Swal.fire("Error", "Nama mapel wajib diisi", "error");
            return;
        }
        const url = isEdit ? `${API}/${selectedId}` : API;
        const method = isEdit ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const result = await res.json();

        if (!res.ok) {
            Swal.fire("Error", result.message, "error");
            return;
        }

        Swal.fire("Sukses", result.message, "success");
        setShowModal(false);
        fetchData();
    };

    const handleEdit = (data) => {
        setForm({ nama_mapel: data.nama_mapel });
        setSelectedId(data.id);
        setIsEdit(true);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Yakin hapus?",
            icon: "warning",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch(`${API}/${id}`, { method: "DELETE" });
                Swal.fire("Sukses", "Data dihapus", "success");
                fetchData();
            }
        });
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6 bg-gray-100 min-h-screen pt-20">
                <div className="flex justify-between mb-6">
                    <h1 className="text-xl font-bold text-violet-700">
                        Mata Pelajaran
                    </h1>

                    <button
                        onClick={openTambah}
                        className="bg-violet-600 text-white px-4 py-2 rounded"
                    >
                        + Tambah
                    </button>
                </div>

                {/* modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                        <div className="bg-white w-[500px] rounded-lg shadow-lg overflow-hidden">

                            <div className="bg-violet-600 text-white flex justify-between items-center px-4 py-3">
                                <h2 className="font-semibold text-lg">
                                    {isEdit ? "✏️ Edit Jenis Mata Pelajaran" : "+ Tambah Mata Pelajaran"}
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
                                    placeholder="Nama Mata Pelajaran"
                                    value={form.nama_mapel}
                                    onChange={(e) => setForm({ ...form, nama_mapel: e.target.value })}
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
                            <thead className="bg-violet-600 text-white">
                                <tr>
                                    <th className="p-3">No</th>
                                    <th className="p-3 text-left">Nama Mata Pelajaran</th>
                                    <th className="p-3">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {mataPelajaran.map((item, index) => (
                                    <tr key={item.id} className="border-t">
                                        <td className="p-2 text-center">{index + 1}</td>
                                        <td className="p-2">{item.nama_mapel}</td>
                                        <td className="p-2 flex justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="bg-yellow-400 px-2 py-1 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MataPelajaran;