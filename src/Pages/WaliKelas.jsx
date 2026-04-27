import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

const WaliKelas = () => {
    const [waliKelas, setWaliKelas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        nama_kelas: "",
        nama_pegawai: "",
        tahun_ajaran: ""
    });

    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchData = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/wali-kelas");
            const data = await res.json();
            setWaliKelas(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openTambah = () => {
        setForm({
            nama_kelas: "",
            nama_pegawai: "",
            tahun_ajaran: ""
        });
        setIsEdit(false);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        if (!form.nama_kelas || !form.nama_pegawai || !form.tahun_ajaran) {
            Swal.fire("Error", "Semua field wajib diisi!", "error");
            return;
        }

        try {
            const url = isEdit
                ? `http://localhost:8000/api/wali-kelas/${selectedId}`
                : "http://localhost:8000/api/wali-kelas";

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
            setForm({ nama_kelas: "", nama_pegawai: "", tahun_ajaran: "" });
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
            text: `Wali kelas ${nama} akan dihapus`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`http://localhost:8000/api/wali-kelas/${id}`, {
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
            nama_kelas: data.nama_kelas,
            nama_pegawai: data.nama_pegawai,
            tahun_ajaran: data.tahun_ajaran
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
                        Wali Kelas
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
                                    {isEdit ? "✏️ Edit Wali Kelas" : "+ Tambah Wali Kelas"}
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
                                    placeholder="Nama Kelas (contoh: VII A)"
                                    value={form.nama_kelas}
                                    onChange={(e) => setForm({ ...form, nama_kelas: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />

                                <input
                                    type="text"
                                    placeholder="Nama Pegawai"
                                    value={form.nama_pegawai}
                                    onChange={(e) => setForm({ ...form, nama_pegawai: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />

                                <input
                                    type="text"
                                    placeholder="Tahun Ajaran (contoh: 2026/2027)"
                                    value={form.tahun_ajaran}
                                    onChange={(e) => setForm({ ...form, tahun_ajaran: e.target.value })}
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
                                    <th className="p-2">Nama Kelas</th>
                                    <th className="p-2">Nama Pegawai</th>
                                    <th className="p-2">Tahun Ajaran</th>
                                    <th className="p-2">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {waliKelas.map((w, i) => (
                                    <tr key={w.id} className="text-center border-t">
                                        <td ></td>
                                        <td></td>
                                        <td ></td>
                                        <td></td>
                                        <td className="p-2 flex justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(w)}
                                                className="p-2 bg-sky-100 text-sky-600 rounded"
                                            >
                                                <i className="ri-edit-2-line"></i>
                                            </button>

                                            <button
                                                onClick={() => handleDelete(w.id, w.nama_pegawai)}
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

export default WaliKelas;