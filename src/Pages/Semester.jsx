import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

const Semester = () => {
    const [tahunAjaranList, setTahunAjaranList] = useState([]);
    const [jenisSemesterList, setJenisSemesterList] = useState([]);
    const [Semester, setSemester] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        id_tahun_ajaran: "",
        jenis_semester: "",
        nama_semester: ""
    });

    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchData = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/semester");
            const data = await res.json();
            setSemester(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();

        fetch("http://localhost:8000/api/tahun-ajaran/active")
            .then(res => res.json())
            .then(data => {
                // LANGSUNG set data, jangan di-filter lagi 
                // karena backend sudah memfilter is_active = True
                setTahunAjaranList(data.data || []);
            })
            .catch(err => console.error("Gagal load tahun ajaran:", err));

        fetch("http://localhost:8000/api/jenis-semester")
            .then(res => res.json())
            .then(data => setJenisSemesterList(data.data || []));

    }, []);

    const openTambah = () => {
        setForm({
            id_tahun_ajaran: "",
            jenis_semester: "",
            nama_semester: ""
        });
        setIsEdit(false);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        if (!form.id_tahun_ajaran || !form.jenis_semester || !form.nama_semester) {
            Swal.fire("Error", "Semua field wajib diisi!", "error");
            return;
        }

        try {
            const url = isEdit
                ? `http://localhost:8000/api/semester/${selectedId}`
                : "http://localhost:8000/api/semester";

            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const result = await res.json();

            Swal.fire("Sukses", result.message, "success");

            setShowModal(false);
            fetchData();

        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:8000/api/semester/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();
        Swal.fire("Sukses", data.message, "success");
        fetchData();
    };

    const handleEdit = (data) => {
        setForm({
            id_tahun_ajaran: data.id_tahun_ajaran || "",
            jenis_semester: data.jenis_semester || "",
            nama_semester: data.nama_semester || ""
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

                            {/* tambah data */}
                            <div className="p-5 space-y-4">
                                <select
                                    value={form.id_tahun_ajaran || ""}
                                    onChange={(e) => setForm({ ...form, id_tahun_ajaran: e.target.value })}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">-- Pilih Tahun Ajaran --</option>
                                    {tahunAjaranList.map((ta) => (
                                        <option key={ta.id} value={ta.id}>
                                            {/* Tampilkan ta.nama saja karena isinya sudah mencakup tahun (misal: 2024/2025) */}
                                            {ta.nama}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={form.jenis_semester || ""}
                                    onChange={(e) => setForm({ ...form, jenis_semester: e.target.value })}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">-- Pilih Jenis Semester --</option>
                                    {jenisSemesterList.map((js) => (
                                        <option key={js.id} value={js.nama}>
                                            {js.nama}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Nama Semester (contoh: Semester 1)"
                                    value={form.nama_semester || ""}
                                    onChange={(e) => setForm({ ...form, nama_semester: e.target.value })}
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
                                        <td>{i + 1}</td>
                                        <td>{w.tahun_ajaran}</td>
                                        <td>{w.jenis_semester}</td>
                                        <td>{w.nama_semester}</td>
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