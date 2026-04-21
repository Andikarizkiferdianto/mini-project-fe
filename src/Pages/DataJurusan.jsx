import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

const DataJurusan = () => {
    const [jurusan, setJurusan] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        kode_jurusan: "",
        nama_jurusan: ""
    });

    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // ================= FETCH DATA =================
    const fetchJurusan = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/jurusan");
            const data = await res.json();
            setJurusan(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchJurusan();
    }, []);

    // ================= TAMBAH =================
    const openTambah = () => {
        setForm({
            kode_jurusan: "",
            nama_jurusan: ""
        });
        setIsEdit(false);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        if (!form.kode_jurusan || !form.nama_jurusan) {
            Swal.fire("Error", "Field tidak boleh kosong!", "error");
            return;
        }

        try {
            const url = isEdit
                ? `http://localhost:8000/api/jurusan/${selectedId}`
                : "http://localhost:8000/api/jurusan";

            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const result = await res.json();

            if (!res.ok) {
                Swal.fire("Error", result.message, "error");
                return;
            }

            Swal.fire("Sukses", result.message, "success");

            setShowModal(false);
            setIsEdit(false);
            setSelectedId(null);

            fetchJurusan();

        } catch (err) {
            console.error(err);
        }
    };
    // ================= DELETE =================
    const handleDelete = (id, nama) => {
        Swal.fire({
            title: "Yakin hapus?",
            text: `Jurusan ${nama} akan dihapus`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`http://localhost:8000/api/jurusan/${id}`, {
                    method: "DELETE"
                });

                const data = await res.json();

                Swal.fire("Sukses", data.message, "success");
                fetchJurusan();
            }
        });
    };

    const handleEdit = (data) => {
        setForm({
            kode_jurusan: data.kode_jurusan,
            nama_jurusan: data.nama_jurusan
        });

        setSelectedId(data.id);
        setIsEdit(true);
        setShowModal(true);
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6 bg-gray-100 min-h-screen pt-20">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold text-violet-700 flex items-center gap-2">
                        <i className="ri-building-4-fill"></i>
                        Data Jurusan
                    </h1>

                    <button
                        onClick={openTambah}
                        className="text-white px-4 py-2 rounded bg-violet-600 hover:bg-violet-700"
                    >
                        + Tambah
                    </button>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                        <div className="bg-white w-[500px] rounded-lg shadow-lg overflow-hidden">

                            <div className="bg-violet-600 text-white flex justify-between items-center px-4 py-3">
                                <h2 className="font-semibold text-lg">
                                    {isEdit ? "✏️ Edit Jurusan" : "+ Tambah Jurusan"}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-white text-xl"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Tambah data jurusan */}
                            <div className="p-5 space-y-4">
                                <input
                                    type="text"
                                    placeholder="Kode Jurusan"
                                    value={form.kode_jurusan}
                                    onChange={(e) =>
                                        setForm({ ...form, kode_jurusan: e.target.value })
                                    }
                                    className="w-full border p-2 rounded"
                                />

                                <input
                                    type="text"
                                    placeholder="Nama Jurusan"
                                    value={form.nama_jurusan}
                                    onChange={(e) =>
                                        setForm({ ...form, nama_jurusan: e.target.value })
                                    }
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
                                    <th className="p-2">Kode Jurusan</th>
                                    <th className="p-2">Nama Jurusan</th>
                                    <th className="p-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jurusan.map((j, i) => (
                                    <tr key={j.id} className="text-center border-t">
                                        <td className="p-2">{i + 1}</td>
                                        <td className="p-2">{j.kode_jurusan}</td>
                                        <td className="p-2">{j.nama_jurusan}</td>
                                        <td className="p-2 flex justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(j)}
                                                className="p-2 bg-sky-100 text-sky-600 hover:bg-sky-200 rounded-md transition"                                            >
                                                <i className="ri-edit-2-line"></i>
                                            </button>

                                            <button
                                                onClick={() => handleDelete(j.id, j.nama_jurusan)}
                                                className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-md transition"                                            >
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

export default DataJurusan;