import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

const SettingUser = () => {
    const [kelas, setKelas] = useState([]);
    const [jenisUser, setJenisUser] = useState([]);

    const [selectedJenis, setSelectedJenis] = useState("");
    const [selectedKelas, setSelectedKelas] = useState("");

    const [dataUser, setDataUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8000/api/setting-user")
            .then(res => res.json())
            .then(res => {
                setKelas(res?.options?.kelas || []);
                setJenisUser(res?.options?.jenis_user || []);
            })
            .catch(() => {
                setKelas([]);
                setJenisUser([]);
            });
    }, []);

    const handleTampil = () => {
        setLoading(true);

        fetch("http://localhost:8000/api/setting-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jenis_user: selectedJenis,
                kelas_id: selectedKelas || null
            })
        })
            .then(res => res.json())
            .then(res => {
                setDataUser(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                <h1 className="text-3xl font-semibold">
                    Manajemen User
                </h1>

                {/* FILTER */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

                    <div className="bg-violet-600 text-white px-4 py-3">
                        Filter User
                    </div>

                    <div className="p-4 flex gap-3">

                        {/* JENIS USER */}
                        <select
                            className="border border-gray-200 rounded px-3 py-2 w-60"
                            value={selectedJenis}
                            onChange={(e) => setSelectedJenis(e.target.value)}
                        >
                            <option value="">Pilih Jenis User</option>
                            {jenisUser.map((j, i) => (
                                <option key={i} value={j}>{j}</option>
                            ))}
                        </select>

                        {/* KELAS */}
                        <select
                            className="border border-gray-200 rounded px-3 py-2 w-60"
                            value={selectedKelas}
                            onChange={(e) => setSelectedKelas(e.target.value)}
                        >
                            <option value="">Semua Kelas</option>
                            {kelas.map((k, i) => (
                                <option key={i} value={k.id}>
                                    {k.nama}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleTampil}
                            className="bg-violet-600 text-white px-6 py-2 rounded"
                        >
                            {loading ? "Loading..." : "Tampilkan"}
                        </button>

                    </div>
                </div>

                <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">NIS/NIP</th>
                                <th className="p-3 text-left">Nama</th>
                                <th className="p-3 text-left">Username</th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataUser.length === 0 ? (
                                <tr>
                                    <td className="p-4 text-center text-gray-500" colSpan="4">
                                        Tidak ada data
                                    </td>
                                </tr>
                            ) : (
                                dataUser.map((u, i) => (
                                    <tr key={i} className="border-t">
                                        <td className="p-3">{i + 1}</td>
                                        <td className="p-3">{u.nis_id}</td>
                                        <td className="p-3">{u.nama}</td>
                                        <td className="p-3">{u.username}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    );
};

export default SettingUser;