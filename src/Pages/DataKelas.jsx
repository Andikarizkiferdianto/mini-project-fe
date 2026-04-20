import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

const DataKelas = () => {
    const [kelas, setKelas] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [jurusanList, setJurusanList] = useState([]);
    const [tahunList, setTahunList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/jurusan")
            .then(res => res.json())
            .then(data => setJurusanList(data.data));

        fetch("http://localhost:8000/api/tahun-ajaran")
            .then(res => res.json())
            .then(data => setTahunList(data.data));
    }, []);
    const [form, setForm] = useState({
        kode_kelas: "",
        nama_kelas: "",
        id_jurusan: "",
        id_tahun_ajaran: "",
        wali_kelas_name: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.kode_kelas || !form.nama_kelas) {
            Swal.fire("Warning", "Kode & Nama wajib!", "warning");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/kelas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    kode_kelas: form.kode_kelas,
                    nama_kelas: form.nama_kelas,
                    id_jurusan: 1,          // 🔥 default biar gak error
                    id_tahun_ajaran: 1,     // 🔥 default
                    wali_kelas_name: form.wali_kelas_name || "-"
                })
            });

            const data = await res.json();

            if (!res.ok) {
                Swal.fire("Error", data.message, "error");
                return;
            }

            Swal.fire("Berhasil!", data.message, "success");

            setShowModal(false);
            setForm({
                kode_kelas: "",
                nama_kelas: "",
                wali_kelas_name: ""
            });

            fetchKelas();

        } catch (err) {
            Swal.fire("Error", "Gagal tambah data", "error");
        }
    };

    const fetchKelas = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/kelas");
            const data = await res.json();
            setKelas(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchKelas();
    }, []);

    const handleDelete = (id, nama) => {
        Swal.fire({
            title: `Hapus ${nama}?`,
            text: "Data tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch(`http://localhost:8000/api/kelas/${id}`, {
                    method: "DELETE",
                });
                Swal.fire("Berhasil!", "Data dihapus", "success");
                fetchKelas();
            }
        });
    };

    // filter search
    const filtered = kelas.filter((k) =>
        k.nama_kelas.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                {showModal && (
                    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">

                        <div className="bg-white w-[500px] rounded-lg shadow-lg overflow-hidden">

                         
                            <div className="bg-violet-600 text-white flex justify-between items-center px-4 py-3">
                                <h2 className="font-semibold text-lg">+ Tambah Kelas</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-white text-xl"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-5 space-y-4">
                                <div>
                                    <label className="block text-sm mb-1">Kode Kelas</label>
                                    <input
                                        type="text"
                                        name="kode_kelas"
                                        value={form.kode_kelas}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-1">Nama Kelas</label>
                                    <input
                                        type="text"
                                        name="nama_kelas"
                                        value={form.nama_kelas}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Nama Kelas</label>
                                    <input
                                        type="text"
                                        name="wali_kelas_name"
                                        placeholder="Wali Kelas"
                                        value={form.wali_kelas_name}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>
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
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold text-violet-700 flex items-center gap-2">
                        <i className="ri-school-fill"></i>
                        Data Kelas
                    </h1>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    {/* HEADER */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Daftar Kelas</h2>

                        <button
                            onClick={() => setShowModal(true)}
                            className="text-white px-4 py-2 rounded bg-violet-600 hover:bg-violet-700"
                        >
                            + Tambah
                        </button>
                    </div>


                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-2">No</th>
                                    <th className="p-2">Kode Kelas</th>
                                    <th className="p-2">Nama Kelas</th>
                                    <th className="p-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((k, index) => (
                                    <tr key={k.id} className="border-t text-center hover:bg-gray-50">
                                        <td className="p-2">{index + 1}</td>
                                        <td className="p-2">{k.kode_kelas}</td>
                                        <td className="p-2">{k.nama_kelas}</td>
                                        <td className="p-2 flex justify-center gap-2">
                                            {/* EDIT */}
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                                                ✏️
                                            </button>

                                            {/* DELETE */}
                                            <button
                                                onClick={() => handleDelete(k.id, k.nama_kelas)}
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="p-4 text-center">
                                            Tidak ada data
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

export default DataKelas;