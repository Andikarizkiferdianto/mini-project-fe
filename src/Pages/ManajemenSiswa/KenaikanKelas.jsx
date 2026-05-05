import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2";

const KenaikanKelas = () => {
    const [tahunAjaran, setTahunAjaran] = useState("");
    const [kelas, setKelas] = useState("");
    const [kelasTujuan, setKelasTujuan] = useState("");
    const [listTahun, setListTahun] = useState([]);
    const [listKelas, setListKelas] = useState([]);
    const [siswaAsal, setSiswaAsal] = useState([]);
    const [selectedSiswa, setSelectedSiswa] = useState([]);
    const [kelasBaru, setKelasBaru] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/kelas")
            .then(res => res.json())
            .then(data => setListKelas(data.data))
            .catch(err => console.error(err));

        fetch("http://localhost:8000/api/tahun-ajaran")
            .then(res => res.json())
            .then(data => setListTahun(data.data))
            .catch(err => console.error(err));
    }, []);

    const handleTampil = () => {
        if (!tahunAjaran || !kelas) {
            Swal.fire("Warning", "Pilih tahun ajaran & kelas!", "warning");
            return;
        }

        fetch(`http://localhost:8000/api/siswa?kelas=${kelas}&tahun=${tahunAjaran}`)
            .then(res => res.json())
            .then(data => {
                setSiswaAsal(data.data);
                setSelectedSiswa([]);
            })
            .catch(() => {
                Swal.fire("Error", "Gagal ambil data!", "error");
            });
    };


    const handleTambah = () => {
        if (selectedSiswa.length === 0) {
            Swal.fire("Warning", "Pilih siswa dulu!", "warning");
            return;
        }

        setKelasBaru([...kelasBaru, ...selectedSiswa]);

        setSiswaAsal(
            siswaAsal.filter(
                s => !selectedSiswa.find(sel => sel.id === s.id)
            )
        );

        setSelectedSiswa([]);
    };

    const handleProses = () => {
        fetch("http://localhost:8000/api/kenaikan-kelas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tahun_ajaran: tahunAjaran,
                kelas_asal: kelas,
                kelas_tujuan: kelasTujuan,
                siswa: kelasBaru
            })
        })
            .then(res => res.json())
            .then(res => {
                Swal.fire("Success", res.message, "success");
            })
            .catch(() => {
                Swal.fire("Error", "Gagal!", "error");
            });
    };


    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 mt-15">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold text-violet-700 flex items-center gap-2">
                        <i className="ri-arrow-up-long-line"></i>
                        Kenaikan Kelas
                    </h1>
                </div>

                <div className="grid md:grid-cols-2 gap-4">

                    <div className="bg-white rounded-lg shadow border border-red-300">
                        <div className="bg-red-500 text-white text-center py-2 rounded-t-lg font-semibold">
                            Kelas Asal
                        </div>

                        <div className="p-4">
                            <div className="flex gap-2 mb-3">

                                <select
                                    className="w-1/2 border rounded px-3 py-2"
                                    value={tahunAjaran}
                                    onChange={(e) => setTahunAjaran(e.target.value)}
                                >
                                    <option value="">Pilih Tahun</option>
                                    {listTahun.map((t) => (
                                        <option key={t.id} value={t.tahun}>
                                            {t.nama}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="w-1/2 border rounded px-3 py-2"
                                    value={kelas}
                                    onChange={(e) => setKelas(e.target.value)}
                                >
                                    <option value="">Pilih Kelas</option>
                                    {listKelas.map((k) => (
                                        <option key={k.id} value={k.id}>
                                            {k.nama_kelas}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={handleTampil}
                                className="bg-red-500 text-white px-4 py-2 rounded mb-3"
                            >
                                🔍 Tampilkan Siswa
                            </button>

                            <table className="w-full border">
                                <thead>
                                    <tr className="bg-gray-200 text-center">
                                        <th></th>
                                        <th>Nama</th>
                                        <th>NIS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {siswaAsal.map((s) => (
                                        <tr key={s.id} className="text-center border-t">
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSiswa.some(sel => sel.id === s.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedSiswa([...selectedSiswa, s]);
                                                        } else {
                                                            setSelectedSiswa(
                                                                selectedSiswa.filter(sel => sel.id !== s.id)
                                                            );
                                                        }
                                                    }}
                                                />
                                            </td>
                                            <td>{s.nama}</td>
                                            <td>{s.nis}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button
                                onClick={handleTambah}
                                className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
                            >
                                + Tambahkan ke Kelas Baru
                            </button>
                        </div>
                    </div>

                    {/* KELAS BARU */}
                    <div className="bg-white rounded-lg shadow border border-green-300">
                        <div className="bg-green-600 text-white text-center py-2 rounded-t-lg font-semibold">
                            Kelas Baru
                        </div>
                        <div className="p-4">
                            <table className="w-full border">
                                <thead>
                                    <tr className="bg-gray-200 text-center">
                                        <th>Nama</th>
                                        <th>NIS</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kelasBaru.map((s) => (
                                        <tr key={s.id} className="text-center border-t">
                                            <td>{s.nama}</td>
                                            <td>{s.nis}</td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        setKelasBaru(kelasBaru.filter(x => x.id !== s.id))
                                                    }
                                                    className="text-red-500"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded">
                                ✔ Proses Kenaikan
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default KenaikanKelas;