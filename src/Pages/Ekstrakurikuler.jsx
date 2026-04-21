import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

const Ekstrakurikuler = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [form, setForm] = useState({
        nama_ekskul: "",
        pembina: "",
        jadwal: "",
        tanggal: "",
        keterangan: ""
    });

    const API = "http://localhost:8000/api/ekskul";

    const fetchEkskul = async () => {
        const res = await fetch(API);
        const result = await res.json();
        setData(result.data);
    };

    useEffect(() => {
        fetchEkskul();
    }, []);

    const openTambah = () => {
        setForm({
            nama_ekskul: "",
            pembina: "",
            jadwal: "",
            tanggal: "",
            keterangan: ""
        });
        setIsEdit(false);
        setShowModal(true);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

     const handleSubmit = async () => {
        if (!form.nama_ekskul || !form.pembina) {
            Swal.fire("Error", "Field tidak boleh kosong!", "error");
            return;
        }

        try {
            const res = await fetch(API, {
                method: "POST",
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
            fetchEkskul();

        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = (id, nama) => {
        Swal.fire({
            title: "Yakin hapus?",
            text: `Ekskul ${nama} akan dihapus`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`${API}/${id}`, {
                    method: "DELETE"
                });

                const data = await res.json();

                Swal.fire("Sukses", data.message, "success");
                fetchEkskul();
            }
        });
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6 bg-gray-100 min-h-screen pt-20">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold text-violet-700 flex items-center gap-2">
                        Data Ekstrakurikuler
                    </h1>
                </div>
                <div className="bg-white rounded-xl shadow p-4">

                    <div className="flex justify-between mb-4">

                        <div>

                        </div>
                        <button
                            onClick={openTambah}
                            className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-1 rounded text-sm font-semibold">

                            + Tambah
                        </button>
                    </div>


                    {/* tabel */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    <th className="p-3">No</th>
                                    <th className="p-3">Nama</th>
                                    <th className="p-3">Pembina</th>
                                    <th className="p-3">Jadwal</th>
                                    <th className="p-3">Tanggal</th>
                                    <th className="p-3">Keterangan</th>
                                    <th className="p-3">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((item, i) => (
                                    <tr key={item.id} className="text-center border-t hover:bg-gray-50 transition">
                                        <td className="p-3">{i + 1}</td>
                                        <td className="p-3">{item.nama_ekskul}</td>
                                        <td className="p-3">{item.pembina}</td>
                                        <td className="p-3">{item.jadwal}</td>
                                        <td className="p-3">{item.tanggal}</td>
                                        <td className="p-3">{item.keterangan}</td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => handleDelete(item.id, item.nama_ekskul)}
                                                className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-md transition"                                    >
                                                <i className="ri-delete-bin-6-line"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* tambah eskul */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                            <div className="bg-white p-5 rounded w-[400px]">

                                <h2 className="text-lg font-bold mb-3">
                                    Tambah Ekskul
                                </h2>

                                <input
                                    type="text"
                                    name="nama_ekskul"
                                    placeholder="Nama Ekskul"
                                    className="w-full border p-2 mb-2"
                                    onChange={handleChange}
                                />

                                <input
                                    type="text"
                                    name="pembina"
                                    placeholder="Pembina"
                                    className="w-full border p-2 mb-2"
                                    onChange={handleChange}
                                />

                                <input
                                    type="text"
                                    name="jadwal"
                                    placeholder="Jadwal"
                                    className="w-full border p-2 mb-2"
                                    onChange={handleChange}
                                />

                                <input
                                    type="date"
                                    name="tanggal"
                                    className="w-full border p-2 mb-2"
                                    onChange={handleChange}
                                />

                                <input
                                    type="text"
                                    name="keterangan"
                                    placeholder="Keterangan"
                                    className="w-full border p-2 mb-2"
                                    onChange={handleChange}
                                />

                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="bg-gray-500 text-white px-3 py-1 rounded"
                                    >
                                        Batal
                                    </button>

                                    <button
                                        onClick={handleSubmit}
                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                    >
                                        Simpan
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Ekstrakurikuler;