import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

const DataKelas = () => {
    const [kelas, setKelas] = useState([]);
    const [search, setSearch] = useState("");

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

                        <button className="text-white px-4 py-2 rounded bg-violet-600 hover:bg-violet-700">
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