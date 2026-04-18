import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TambahDataSiswa = () => {
    const navigate = useNavigate();

    const [kelas, setKelas] = useState([]);
    const [form, setForm] = useState({
        nis: "",
        nisn: "",
        nama: "",
        tempat_lahir: "",
        tgl_lahir: "",
        jenis_kelamin: "",
        alamat: "",
        agama: "",
        golongan_darah: "",
        tahun_ajaran: "",
        tahun_masuk: "",
        sekolah_asal: "",
        no_hp: "",
        nama_ayah: "",
        pekerjaan_ayah: "",
        no_hp_ayah: "",
        nama_ibu: "",
        pekerjaan_ibu: "",
        no_hp_ibu: "",
        id_kelas: "",
        id_jurusan: 1 // default biar aman
    });

    useEffect(() => {
        fetch("http://localhost:8000/api/kelas")
            .then(res => res.json())
            .then(data => setKelas(data.data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: name === "id_kelas" ? Number(value) : value
        });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
        "nis",
        "nama",
        "tgl_lahir",
        "jenis_kelamin",
        "alamat",
        "id_kelas"
    ];

    const isEmpty = requiredFields.some(
        (field) =>
            form[field] === "" ||
            form[field] === null ||
            form[field] === undefined
    );

    if (isEmpty) {
        Swal.fire("Warning", "Semua data wajib harus diisi!", "warning");
        return;
    }

    try {
        const res = await fetch("http://localhost:8000/api/siswa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (!res.ok) {
            Swal.fire("Error", data.message, "error");
            return;
        }

        Swal.fire("Berhasil!", data.message, "success");
        navigate("/manajemen-siswa=data-siswa");

    } catch (err) {
        Swal.fire("Error", "Terjadi kesalahan server", "error");
    }
};



    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6">
                <div className="bg-white rounded shadow overflow-hidden mt-5">

                    <div className="p-6 mt-5">
                        <div className="bg-violet-600 text-white px-4 py-3 font-semibold">
                            Form Tambah Siswa
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-4">

                            <input name="nis" placeholder="NIS" onChange={handleChange} className="border p-2 rounded" />
                            <input name="nisn" placeholder="NISN" onChange={handleChange} className="border p-2 rounded" />

                            <input name="nama" placeholder="Nama Lengkap" onChange={handleChange} className="border p-2 rounded col-span-2" />

                            <input name="tempat_lahir" placeholder="Tempat Lahir" onChange={handleChange} className="border p-2 rounded" />
                            <input type="date" name="tgl_lahir" onChange={handleChange} className="border p-2 rounded" />

                            <select name="jenis_kelamin" onChange={handleChange} className="border p-2 rounded">
                                <option value="">Jenis Kelamin</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>

                            <input name="agama" placeholder="Agama" onChange={handleChange} className="border p-2 rounded" />

                            <input name="alamat" placeholder="Alamat" onChange={handleChange} className="border p-2 rounded col-span-2" />

                            <input name="golongan_darah" placeholder="Golongan Darah" onChange={handleChange} className="border p-2 rounded" />

                            <input name="tahun_ajaran" placeholder="Tahun Ajaran" onChange={handleChange} className="border p-2 rounded" />
                            <input name="tahun_masuk" placeholder="Tahun Masuk" onChange={handleChange} className="border p-2 rounded" />

                            <select name="id_kelas" onChange={handleChange} className="border p-2 rounded">
                                <option value="">Pilih Kelas</option>
                                {kelas.map(k => (
                                    <option key={k.id} value={k.id}>{k.nama_kelas}</option>
                                ))}
                            </select>

                            <input name="sekolah_asal" placeholder="Sekolah Asal" onChange={handleChange} className="border p-2 rounded" />
                            <input name="no_hp" placeholder="No HP / WA" onChange={handleChange} className="border p-2 rounded" />

                        </div>

                        <h2 className="font-semibold mt-6 mb-3 text-gray-700">Data Orang Tua</h2>

                        <div className="grid grid-cols-3 gap-4">

                            <input name="nama_ayah" placeholder="Nama Ayah" onChange={handleChange} className="border p-2 rounded" />

                            <input name="pekerjaan_ayah" placeholder="Pekerjaan Ayah" onChange={handleChange} className="border p-2 rounded" />
                            <input name="no_hp_ayah" placeholder="No HP Ayah" onChange={handleChange} className="border p-2 rounded" />

                            <input name="nama_ibu" placeholder="Nama Ibu" onChange={handleChange} className="border p-2 rounded" />
                            <input name="pekerjaan_ibu" placeholder="Pekerjaan Ibu" onChange={handleChange} className="border p-2 rounded" />
                            <input name="no_hp_ibu" placeholder="No HP Ibu" onChange={handleChange} className="border p-2 rounded" />

                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={() => navigate("/manajemen-siswa=data-siswa")}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                ← Kembali
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                            >
                                Simpan
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TambahDataSiswa;