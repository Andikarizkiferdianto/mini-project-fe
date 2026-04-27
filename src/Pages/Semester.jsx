import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

const Semester = () => {
    const [Semester, setSemester] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        tahun_ajaran: "",
        tahun: ""
    });

    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchData = async () => {
        try {
            const res = await fetch("");
            const data = await res.json();
            setSemester(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openTambah = () => {
        setForm({
            tahun_ajaran: "",
            tahun: ""
        });
        setIsEdit(false);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        if (!form.tahun_ajaran || !form.tahun) {
            Swal.fire("Error", "Semua field wajib diisi!", "error");
            return;
        }

        try {
            const url = isEdit
                ? ``
                : "";

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
                Swal.fire("Error", result.message, "error");
                return;
            }

            Swal.fire("Sukses", result.message, "success");

            setShowModal(false);
            setForm({ tahun_ajaran: "", tahun: "" });
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
                const res = await fetch(``, {
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
            tahun_ajaran: data.tahun_ajaran,
            tahun: data.tahun
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
                       Daftar Semester
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
                                    {isEdit ? "✏️ Edit Semester" : "+ Tambah Semester"}
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
                                    placeholder=" "
                                    value={form.semester}
                                    onChange={(e) => setForm({ ...form, semester: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />

                                <input
                                    type="text"
                                    placeholder=""
                                    value={form.keterangan}
                                    onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder=""
                                    value={form.keterangan}
                                    onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
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
                                    <th className="p-2">Jenis Semester</th>
                                    <th className="p-2">Nama Semester</th>
                                    <th className="p-2">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Semester.map((w, i) => (
                                    <tr key={w.id} className="text-center border-t">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
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

export default Semester;