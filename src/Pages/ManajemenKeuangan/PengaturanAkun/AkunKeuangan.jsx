import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../../../components/Sidebar";



const AkunKeuangan = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [formData, setFormData] = useState({
        akun_id: "", nomor_rekening: "", kategori: "", jenis_arus_kas: "", keterangan: ""
    });

    const fetchData = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/akun-keuangan");
            const result = await res.json();
            if (result.status === "success") setData(result.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        const url = isEdit ? `http://localhost:8000/api/akun-keuangan/${selectedId}` : "http://localhost:8000/api/akun-keuangan";
        const method = isEdit ? "PUT" : "POST";
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        if ((await res.json()).status === "success") {
            Swal.fire("Berhasil", "Data tersimpan", "success");
            setShowModal(false);
            fetchData();
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({ title: "Yakin hapus?", text: "Data akan dihapus permanen!", icon: "warning", showCancelButton: true, confirmButtonText: "Ya, hapus!" });
        if (confirm.isConfirmed) {
            await fetch(`http://localhost:8000/api/akun-keuangan/${id}`, { method: "DELETE" });
            fetchData();
        }
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6 mt-12">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold text-violet-700">Data Akun Keuangan</h1>
                    <button
                        onClick={() => { setIsEdit(false); setFormData({}); setShowModal(true); }}
                        className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-semibold shadow">
                        + Tambah Akun
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-violet-600 text-white text-center">
                                <tr>
                                    {["No", "Akun ID", "No Rek", "Kategori", "Arus Kas", "Keterangan", "Aksi"].map(h => (
                                        <th key={h} className="p-3">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((s, index) => (
                                    <tr key={s.id} className="text-center border-t hover:bg-gray-50 transition">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3 font-medium">{s.akun_id}</td>
                                        <td className="p-3">{s.nomor_rekening}</td>
                                        <td className="p-3">{s.kategori}</td>
                                        <td className="p-3">{s.jenis_arus_kas}</td>
                                        <td className="p-3 text-left">{s.keterangan || "-"}</td>
                                        <td className="p-3">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => { setIsEdit(true); setSelectedId(s.id); setFormData(s); setShowModal(true); }} className="p-2 bg-sky-100 text-sky-600 hover:bg-sky-200 rounded-md transition">
                                                    <i className="ri-edit-2-line"></i>
                                                </button>
                                                <button onClick={() => handleDelete(s.id)} className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-md transition">
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl">
                        <h2 className="text-lg font-bold mb-4 border-b pb-2">{isEdit ? "Edit Akun" : "Tambah Akun"}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input name="akun_id" placeholder="Akun ID" value={formData.akun_id || ""} onChange={handleChange} className="border p-2 rounded-lg col-span-2 focus:ring-2 focus:ring-violet-500 outline-none" />
                            <input name="nomor_rekening" placeholder="No Rekening" value={formData.nomor_rekening || ""} onChange={handleChange} className="border p-2 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none" />
                            <select
                                name="kategori"
                                value={formData.kategori || ""}
                                onChange={handleChange}
                                className="border p-2 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
                            >
                                <option value="">Pilih golongan keuangan...</option>
                                <option value="Aset">Aset</option>
                                <option value="Aset Neto">Aset Neto</option>
                                <option value="Liabilitas">Liabilitas</option>
                                <option value="Ekuitas">Ekuitas</option>
                                <option value="Pendapatan">Pendapatan</option>
                                <option value="Beban">Beban</option>
                            </select>
                            <select name="jenis_arus_kas" value={formData.jenis_arus_kas || ""} onChange={handleChange} className="border p-2 rounded-lg col-span-2 focus:ring-2 focus:ring-violet-500 outline-none">
                                <option value="">Jenis Arus Kas</option><option value="Operasi">Operasi</option><option value="Investasi">Investasi</option><option value="Pendanaan">Pendanaan</option>
                            </select>
                            <textarea name="keterangan" placeholder="Keterangan" value={formData.keterangan || ""} onChange={handleChange} className="border p-2 rounded-lg col-span-2 focus:ring-2 focus:ring-violet-500 outline-none" rows="2" />
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">Batal</button>
                            <button onClick={handleSubmit} className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg">Simpan</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AkunKeuangan;