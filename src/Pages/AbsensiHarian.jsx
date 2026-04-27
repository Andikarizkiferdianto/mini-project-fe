import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

const AbsensiHarian = () => {
    const [AbsensiHarian, setAbsensiHarian] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        tahun_ajaran: "",
        tahun: ""
    });

    const [filter, setFilter] = useState({
        kelas: "",
        tanggal_awal: "",
        tanggal_akhir: ""
    });

    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchData = async () => {
        try {
            const res = await fetch("");
            const data = await res.json();
            setAbsensiHarian(data.data);
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
                        Absensi Harian
                    </h1>
                </div>

                <div className="bg-white rounded-lg shadow p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3 font-semibold text-gray-700">
                        <i className="ri-filter-3-line"></i>
                        Filter
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

                        {/* Kelas */}
                        <div>
                            <label className="text-sm">Kelas</label>
                            <select
                                className="w-full border p-2 rounded mt-1"
                                value={filter.kelas}
                                onChange={(e) =>
                                    setFilter({ ...filter, kelas: e.target.value })
                                }
                            >
                                <option value="">-- Semua Kelas --</option>
                            </select>
                        </div>

                        {/* Tanggal Awal */}
                        <div>
                            <label className="text-sm">Tanggal Awal</label>
                            <input
                                type="date"
                                className="w-full border p-2 rounded mt-1"
                                value={filter.tanggal_awal}
                                onChange={(e) =>
                                    setFilter({ ...filter, tanggal_awal: e.target.value })
                                }
                            />
                        </div>

                        {/* Tanggal Akhir */}
                        <div>
                            <label className="text-sm">Tanggal Akhir</label>
                            <input
                                type="date"
                                className="w-full border p-2 rounded mt-1"
                                value={filter.tanggal_akhir}
                                onChange={(e) =>
                                    setFilter({ ...filter, tanggal_akhir: e.target.value })
                                }
                            />
                        </div>

                        {/* Button */}
                        <div className="flex items-end gap-2">
                            <button className="bg-violet-500 text-white px-4 py-2 rounded">
                                <i className="ri-filter-3-line"></i>
                                Filter
                            </button>
                            <button className="bg-gray-400 text-white px-4 py-2 rounded">
                                Reset
                            </button>
                        </div>

                    </div>
                </div>

                {/* tabel */}
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-2">No</th>
                                    <th>Tanggal</th>
                                    <th className="p-2">NIS</th>
                                    <th className="p-2">Nama</th>
                                    <th className="p-2">Kelas</th>
                                    <th className="p-2">Jam Masuk</th>
                                    <th className="p-2">Status Masuk</th>
                                    <th className="p-2">Jam Pulang</th>
                                    <th className="p-2">Status Pulang</th>
                                    <th className="p-2">Keterangan</th>
                                    <th className="p-2">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {AbsensiHarian.map((w, i) => (
                                    <tr key={w.id} className="text-center border-t">
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

export default AbsensiHarian;