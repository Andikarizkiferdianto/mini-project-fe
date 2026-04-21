import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import DetailSiswa from "./DetailSiswa";


const DataSiswa = () => {
    const [siswa, setSiswa] = useState([]);
    const [kelas, setKelas] = useState([]);
    const [selectedKelas, setSelectedKelas] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedSiswa, setSelectedSiswa] = useState(null);


    useEffect(() => {
        fetch("http://localhost:8000/api/siswa")
            .then(res => res.json())
            .then(data => {
                setSiswa(data.data);
            })
            .catch(err => console.error(err));
        fetch("http://localhost:8000/api/kelas")
            .then(res => res.json())
            .then(data => setKelas(data.data))
            .catch(err => console.error(err));
    }, []);

    const handleDetail = (id) => {
        const data = siswa.find(s => s.id === id);
        console.log(data); // 🔥 cek di console
        setSelectedSiswa(data);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Yakin?",
            text: "Data akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8000/api/siswa/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        Swal.fire("Berhasil!", data.message, "success");
                        setSiswa(prev => prev.filter(s => s.id !== id));
                    });
            }
        });
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <DetailSiswa
                isOpen={showModal}
                data={selectedSiswa}
                onClose={() => setShowModal(false)}
            />
            <div className="flex-1 p-6 mb-80 mt-12">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold text-violet-700 flex items-center gap-2">
                        <i className="ri-team-fill"></i>
                        Data Siswa
                    </h1>
                </div>

                {/* filter kelas ng kne */}
                <div className="bg-white rounded-xl shadow p-4 mb-6 border-l-4 border-violet-600">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Kelas
                    </label>

                    <div className="flex gap-3">
                        <select
                            value={selectedKelas}
                            onChange={(e) => setSelectedKelas(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        >
                            <option value="">-- Semua Kelas --</option>

                            {kelas.map((k) => (
                                <option key={k.id} value={k.nama_kelas}>
                                    {k.nama_kelas}
                                </option>
                            ))}
                        </select>

                        <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                            <i className="ri-filter-3-line"></i>
                            Terapkan
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-violet-700 flex items-center gap-2">
                            <i className="ri-list-check-2"></i>
                            Daftar Siswa
                        </h2>

                        <div className="flex gap-2">
                            <button className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-sm font-semibold">
                                Upload
                            </button>
                            <button
                                onClick={() => navigate("/manajemen-siswa/tambah-siswa")}
                                className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-1 rounded text-sm font-semibold">
                                + Tambah
                            </button>
                        </div>
                    </div>

                    {/* tabel */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-3">No</th>
                                    <th className="p-3">NIS</th>
                                    <th className="p-3 text-left">Nama</th>
                                    <th className="p-3">Tgl Lahir</th>
                                    <th className="p-3 text-left">Alamat</th>
                                    <th className="p-3">Kelas</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {siswa
                                    .filter(s => !selectedKelas || s.kelas === selectedKelas)
                                    .map((s, index) => (<tr
                                        key={s.id}
                                        className="text-center border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{s.nis}</td>
                                        <td className="p-3 text-left font-medium text-gray-700">
                                            {s.nama}
                                        </td>
                                        <td className="p-3">{s.tgl_lahir || "-"}</td>
                                        <td className="p-3 text-left">
                                            {s.alamat || "-"}
                                        </td>
                                        <td className="p-3">{s.kelas}</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${s.status_aktif
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                                    }`}
                                            >
                                                {s.status_aktif ? "Aktif" : "Nonaktif"}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-center gap-2">

                                                <button
                                                    onClick={() => navigate(`/manajemen-siswa/edit-siswa/${s.id}`)}
                                                    className="p-2 bg-sky-100 text-sky-600 hover:bg-sky-200 rounded-md transition"
                                                >
                                                    <i className="ri-edit-2-line"></i>
                                                </button>

                                                <button
                                                    onClick={() => handleDetail(s.id)}
                                                    className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md transition"
                                                >
                                                    <i className="ri-eye-line"></i>
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(s.id)}
                                                    className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-md transition"
                                                >
                                                    <i className="ri-delete-bin-6-line"></i>
                                                </button>

                                            </div>
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

export default DataSiswa;