import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Swal from "sweetalert2";


const JadwalMengajar = () => {
    const [tahunAjaran, setTahunAjaran] = useState([]);
    const [selectedTahun, setSelectedTahun] = useState("");
    const [jadwal, setJadwal] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/tahun-ajaran")
            .then(res => res.json())
            .then(res => {
                setTahunAjaran(res.data);
            });
    }, []);

    useEffect(() => {
        if (tahunAjaran.length > 0) {
            const aktif = tahunAjaran.find(t => t.is_active);
            if (aktif) setSelectedTahun(aktif.id);
        }
    }, [tahunAjaran]);

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 mb-80 mt-12">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold text-violet-700 flex items-center gap-2">
                        <i className="ri-team-fill"></i>
                        jadwal Mengajar
                    </h1>
                </div>

                {/* filter kelas ng kne */}
                <div className="bg-white rounded-xl shadow p-4 mb-6 border-l-4 border-violet-600">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Filter Tahun
                    </label>

                    <div className="flex gap-3">
                        <select
                            value={selectedTahun}
                            onChange={(e) => setSelectedTahun(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-64"
                        >
 
                            {tahunAjaran.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.nama}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-violet-700 flex items-center gap-2">
                            <i className="ri-list-check-2"></i>
                            Daftar Jadwal Mengajar Tahun Ajaran
                        </h2>

                        <div className="flex gap-2">

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
                                    <th className="p-3">Guru</th>
                                    <th className="p-3 text-left">Mata Pelajaran</th>
                                    <th className="p-3">Kelas</th>
                                    <th className="p-3 text-left">Hari</th>
                                    <th className="p-3">Jam</th>
                                    <th className="p-3">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {jadwal.map((j, index) => (
                                    <tr key={j.id} className="text-center border-t">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{j.guru}</td>
                                        <td className="p-3">{j.mata_pelajaran}</td>
                                        <td className="p-3">{j.kelas}</td>
                                        <td className="p-3">{j.hari}</td>
                                        <td className="p-3">{j.jam}</td>
                                        <td className="p-3">
                                            <button className="text-blue-500">Edit</button>
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

export default JadwalMengajar;