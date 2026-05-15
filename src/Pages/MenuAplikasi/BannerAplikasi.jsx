import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2";

const BannerAplikasi = () => {
    const [banner, setBanner] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        nama_file: "",
        preview_url: ""
    });

    // ================= GET =================
    useEffect(() => {
        fetchBanner();
    }, []);

    const fetchBanner = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/banner-aplikasi");
            const result = await res.json();

            if (result.status === "success") {
                setBanner(result.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // ================= INPUT =================
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // ================= CREATE =================
    const handleSubmit = async () => {
        if (!form.nama_file || !form.preview_url) {
            Swal.fire("Warning", "Semua field wajib diisi", "warning");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:8000/api/banner-aplikasi", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const result = await res.json();

            if (result.status === "success") {
                Swal.fire("Berhasil", result.message, "success");

                setForm({ nama_file: "", preview_url: "" });
                setShowModal(false);
                fetchBanner();
            } else {
                Swal.fire("Gagal", result.message, "error");
            }
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    // ================= DELETE =================
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Hapus banner ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Hapus"
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await fetch(
                `http://localhost:8000/api/banner-aplikasi/${id}`,
                { method: "DELETE" }
            );

            const result = await res.json();

            if (result.status === "success") {
                Swal.fire("Berhasil", result.message, "success");
                fetchBanner();
            } else {
                Swal.fire("Gagal", result.message, "error");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 p-8 mt-12">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Kelola Banner Aplikasi
                    </h1>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded"
                    >
                        + Upload Banner
                    </button>
                </div>

                {/* TABLE CARD */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">

                            <thead className="bg-violet-600 text-white">
                                <tr>
                                    <th className="p-3 text-center">No</th>
                                    <th className="p-3 text-left">Preview</th>
                                    <th className="p-3 text-left">Nama File</th>
                                    <th className="p-3 text-left">Tanggal</th>
                                    <th className="p-3 text-center">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {banner.length > 0 ? (
                                    banner.map((item, index) => (
                                        <tr key={item.id} className="border-b border-gray-300">

                                            <td className="p-3 text-center">
                                                {index + 1}
                                            </td>

                                            <td className="p-3">
                                                <img
                                                    src={item.preview}
                                                    className="w-20 h-12 object-cover rounded"
                                                />
                                            </td>

                                            <td className="p-3">
                                                {item.nama_file}
                                            </td>

                                            <td className="p-3">
                                                {item.diunggah}
                                            </td>

                                            <td className="p-3 text-center">
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Hapus
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-4 text-center text-gray-500">
                                            Belum ada data
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>

            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white w-[450px] rounded-lg shadow-lg">

                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="font-semibold text-lg">
                                Upload Banner
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-2xl text-gray-500"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-4 space-y-3">

                            <input
                                type="text"
                                name="nama_file"
                                placeholder="Nama File"
                                value={form.nama_file}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />

                            <input
                                type="text"
                                name="preview_url"
                                placeholder="URL Gambar"
                                value={form.preview_url}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />

                        </div>

                        <div className="flex justify-end gap-2 p-4 border-t">

                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="bg-violet-600 text-white px-4 py-2 rounded"
                            >
                                {loading ? "Menyimpan..." : "Simpan"}
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default BannerAplikasi;