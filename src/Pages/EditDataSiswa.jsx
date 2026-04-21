import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditDataSiswa = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jurusan, setJurusan] = useState([]);
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
        id_jurusan: ""
    });

    useEffect(() => {
        if (!id) return;

        getSiswa();
        getKelas();
        getJurusan();
    }, [id]);

    const getSiswa = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/siswa/${id}`);
            const data = res.data.data;

            setForm({
                ...data,
                tgl_lahir: data.tgl_lahir?.slice(0, 10) || "",
                id_jurusan: data.id_jurusan || ""
            });
        } catch (err) {
            Swal.fire("Error", "Gagal ambil data siswa", "error");
        }
    };

    const getKelas = async () => {
        const res = await axios.get("http://localhost:8000/api/kelas");
        setKelas(res.data.data);
    };

    const getJurusan = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/jurusan");
            setJurusan(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: (name === "id_kelas" || name === "id_jurusan")
                ? Number(value)
                : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.id_kelas) {
            Swal.fire("Warning", "Kelas wajib dipilih!", "warning");
            return;
        }

        try {
            await axios.put(
                `http://localhost:8000/api/siswa/${id}`,
                {
                    ...form,
                    id_kelas: Number(form.id_kelas),
                    id_jurusan: Number(form.id_jurusan)
                }
            );

            Swal.fire("Berhasil!", "Data berhasil diupdate", "success");
            navigate("/manajemen-siswa/data-siswa");

        } catch (err) {
            console.log("ERROR:", err.response?.data);
            Swal.fire("Error", err.response?.data?.message || "Gagal update", "error");
        }
    };


    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6">
                <div className="bg-white rounded shadow overflow-hidden">


                    <div className="p-6 mt-5">
                        <div className="bg-violet-600 mt-5 text-white px-4 py-3 font-semibold">
                            Form Edit Siswa
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">

                            <input name="nis" value={form.nis} onChange={handleChange} placeholder="NIS" className="border p-2 rounded" />
                            <input name="nisn" value={form.nisn} onChange={handleChange} placeholder="NISN" className="border p-2 rounded" />

                            <input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama Lengkap" className="border p-2 rounded col-span-2" />

                            <input name="tempat_lahir" value={form.tempat_lahir} onChange={handleChange} placeholder="Tempat Lahir" className="border p-2 rounded" />
                            <input type="date" name="tgl_lahir" value={form.tgl_lahir} onChange={handleChange} className="border p-2 rounded" />

                            <select name="jenis_kelamin" value={form.jenis_kelamin} onChange={handleChange} className="border p-2 rounded">
                                <option value="">Jenis Kelamin</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>

                            <input name="agama" value={form.agama} onChange={handleChange} placeholder="Agama" className="border p-2 rounded" />

                            <input name="alamat" value={form.alamat} onChange={handleChange} placeholder="Alamat" className="border p-2 rounded col-span-2" />

                            <input name="golongan_darah" value={form.golongan_darah} onChange={handleChange} placeholder="Golongan Darah" className="border p-2 rounded" />

                            <input name="tahun_ajaran" value={form.tahun_ajaran} onChange={handleChange} placeholder="Tahun Ajaran" className="border p-2 rounded" />
                            <input name="tahun_masuk" value={form.tahun_masuk} onChange={handleChange} placeholder="Tahun Masuk" className="border p-2 rounded" />

                            <select name="id_kelas" value={form.id_kelas} onChange={handleChange} className="border p-2 rounded">
                                <option value="">Pilih Kelas</option>
                                {kelas.map(k => (
                                    <option key={k.id} value={k.id}>{k.nama_kelas}</option>
                                ))}
                            </select>
                            <select
                                name="id_jurusan"
                                value={form.id_jurusan}
                                onChange={handleChange}
                                className="border p-2 rounded"
                            >
                                <option value="">Pilih Jurusan</option>
                                {jurusan.map(j => (
                                    <option key={j.id} value={j.id}>
                                        {j.nama_jurusan}
                                    </option>
                                ))}
                            </select>
                            <input name="sekolah_asal" value={form.sekolah_asal} onChange={handleChange} placeholder="Sekolah Asal" className="border p-2 rounded" />
                            <input name="no_hp" value={form.no_hp} onChange={handleChange} placeholder="No HP / WA" className="border p-2 rounded" />

                        </div>

                        <h2 className="font-semibold mt-6 mb-3 text-gray-700">Data Orang Tua</h2>

                        <div className="grid grid-cols-3 gap-4">

                            <input name="nama_ayah" value={form.nama_ayah} onChange={handleChange} placeholder="Nama Ayah" className="border p-2 rounded" />
                            <input name="pekerjaan_ayah" value={form.pekerjaan_ayah} onChange={handleChange} placeholder="Pekerjaan Ayah" className="border p-2 rounded" />
                            <input name="no_hp_ayah" value={form.no_hp_ayah} onChange={handleChange} placeholder="No HP Ayah" className="border p-2 rounded" />

                            <input name="nama_ibu" value={form.nama_ibu} onChange={handleChange} placeholder="Nama Ibu" className="border p-2 rounded" />
                            <input name="pekerjaan_ibu" value={form.pekerjaan_ibu} onChange={handleChange} placeholder="Pekerjaan Ibu" className="border p-2 rounded" />
                            <input name="no_hp_ibu" value={form.no_hp_ibu} onChange={handleChange} placeholder="No HP Ibu" className="border p-2 rounded" />

                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={() => navigate("/manajemen-siswa/data-siswa")}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                ← Kembali
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                            >
                                Simpan Perubahan
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditDataSiswa;