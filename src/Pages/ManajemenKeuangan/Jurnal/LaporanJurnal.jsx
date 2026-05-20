import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Swal from "sweetalert2";

const LaporanJurnal = () => {

    const [tanggalAwal, setTanggalAwal] = useState("");
    const [tanggalAkhir, setTanggalAkhir] = useState("");

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [totalDebet, setTotalDebet] = useState(0);
    const [totalKredit, setTotalKredit] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const [formEdit, setFormEdit] = useState({
        id: "",
        tanggal: "",
        kode_akun: "",
        nama_akun: "",
        keterangan: "",
        debet: "",
        kredit: "",
        status: ""
    });

    // FILTER
    const handleFilter = async () => {

        if (!tanggalAwal || !tanggalAkhir) {

            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Tanggal wajib diisi"
            });

            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                `http://localhost:8000/api/jurnal/laporan?start=${tanggalAwal}&end=${tanggalAkhir}`
            );

            const result = await response.json();

            if (result.status === "success") {

                setData(result.data);

                let debet = 0;
                let kredit = 0;

                result.data.forEach((item) => {
                    debet += Number(item.debet);
                    kredit += Number(item.kredit);
                });

                setTotalDebet(debet);
                setTotalKredit(kredit);

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: result.message
                });

            }

        } catch (error) {

            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Gagal mengambil data"
            });

        } finally {

            setLoading(false);

        }
    };

    // EDIT
    const handleEdit = (item) => {

        setFormEdit({
            id: item.id,
            tanggal: item.tanggal,
            kode_akun: item.kode_akun,
            nama_akun: item.nama_akun,
            keterangan: item.keterangan,
            debet: item.debet,
            kredit: item.kredit,
            status: item.status
        });

        setShowModal(true);
    };

    // UPDATE
    const handleUpdate = async () => {

    try {

        const response = await fetch(
            `http://localhost:8000/api/jurnal/laporan/${formEdit.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formEdit)
            }
        );

        const result = await response.json();

        if (response.ok) {

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: result.message,
                timer: 1500,
                showConfirmButton: false
            });

            setShowModal(false);

            handleFilter();

        } else {

            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: result.message
            });

        }

    } catch (error) {

        console.log(error);

        Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Gagal update data"
        });

    }
};
    // DELETE
    const handleDelete = async (id) => {

        const confirmDelete = await Swal.fire({
            title: "Yakin?",
            text: "Data jurnal akan dihapus!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7c3aed",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal"
        });

        if (!confirmDelete.isConfirmed) return;

        try {

            const response = await fetch(
                `http://localhost:8000/api/jurnal/laporan/${id}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (response.ok) {

                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: result.message,
                    timer: 1500,
                    showConfirmButton: false
                });

                handleFilter();

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: result.message
                });

            }

        } catch (error) {

            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Gagal hapus data"
            });

        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6 overflow-x-auto">

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">

                    <div className="bg-violet-500 text-white text-xl px-4 py-3 font-semibold">
                        Laporan Jurnal
                    </div>

                    {/* FILTER */}
                    <div className="bg-gray-50 border-b border-gray-200 p-4">

                        <div className="flex flex-wrap items-end gap-4">

                            <div>
                                <label className="block text-sm mb-1">
                                    Tanggal Awal
                                </label>

                                <input
                                    type="date"
                                    value={tanggalAwal}
                                    onChange={(e) => setTanggalAwal(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">
                                    Tanggal Akhir
                                </label>

                                <input
                                    type="date"
                                    value={tanggalAkhir}
                                    onChange={(e) => setTanggalAkhir(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-2"
                                />
                            </div>

                            <button
                                onClick={handleFilter}
                                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-2 rounded"
                            >
                                {loading ? "Loading..." : "Filter"}
                            </button>

                        </div>

                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead className="bg-gray-100">

                                <tr>

                                    <th className="p-3 text-left">No</th>
                                    <th className="p-3 text-left">Tanggal</th>
                                    <th className="p-3 text-left">Kode Akun</th>
                                    <th className="p-3 text-left">Nama Akun</th>
                                    <th className="p-3 text-left">Keterangan</th>
                                    <th className="p-3 text-right">Debet</th>
                                    <th className="p-3 text-right">Kredit</th>
                                    <th className="p-3 text-center">Status</th>
                                    <th className="p-3 text-center">Aksi</th>

                                </tr>

                            </thead>

                            <tbody>

                                {data.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="text-center p-6 text-gray-500"
                                        >
                                            Tidak ada data
                                        </td>
                                    </tr>

                                ) : (

                                    data.map((item, index) => (

                                        <tr
                                            key={index}
                                            className="border-t"
                                        >

                                            <td className="p-3">
                                                {index + 1}
                                            </td>

                                            <td className="p-3">
                                                {item.tanggal}
                                            </td>

                                            <td className="p-3">
                                                {item.kode_akun}
                                            </td>

                                            <td className="p-3">
                                                {item.nama_akun}
                                            </td>

                                            <td className="p-3">
                                                {item.keterangan}
                                            </td>

                                            <td className="p-3 text-right">
                                                Rp {Number(item.debet).toLocaleString("id-ID")}
                                            </td>

                                            <td className="p-3 text-right">
                                                Rp {Number(item.kredit).toLocaleString("id-ID")}
                                            </td>

                                            <td className="p-3 text-center">
                                                {item.status}
                                            </td>

                                            <td className="p-3">

                                                <div className="flex justify-center gap-2">

                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Hapus
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                            {data.length > 0 && (

                                <tfoot className="bg-violet-200 font-semibold">

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="p-3 text-right"
                                        >
                                            Total
                                        </td>

                                        <td className="p-3 text-right">
                                            Rp {totalDebet.toLocaleString("id-ID")}
                                        </td>

                                        <td className="p-3 text-right">
                                            Rp {totalKredit.toLocaleString("id-ID")}
                                        </td>

                                        <td colSpan="2"></td>

                                    </tr>

                                </tfoot>

                            )}

                        </table>

                    </div>

                </div>

            </div>

            {/* MODAL EDIT */}
            {showModal && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-lg w-full max-w-xl p-6 space-y-4">

                        <h2 className="text-xl font-semibold">
                            Edit Jurnal
                        </h2>

                        <input
                            type="text"
                            placeholder="Kode Akun"
                            value={formEdit.kode_akun}
                            onChange={(e) =>
                                setFormEdit({
                                    ...formEdit,
                                    kode_akun: e.target.value
                                })
                            }
                            className="w-full border rounded px-3 py-2"
                        />

                        <input
                            type="text"
                            placeholder="Nama Akun"
                            value={formEdit.nama_akun}
                            onChange={(e) =>
                                setFormEdit({
                                    ...formEdit,
                                    nama_akun: e.target.value
                                })
                            }
                            className="w-full border rounded px-3 py-2"
                        />

                        <textarea
                            placeholder="Keterangan"
                            value={formEdit.keterangan}
                            onChange={(e) =>
                                setFormEdit({
                                    ...formEdit,
                                    keterangan: e.target.value
                                })
                            }
                            className="w-full border rounded px-3 py-2"
                        />

                        <div className="grid grid-cols-2 gap-3">

                            <input
                                type="number"
                                placeholder="Debet"
                                value={formEdit.debet}
                                onChange={(e) =>
                                    setFormEdit({
                                        ...formEdit,
                                        debet: e.target.value
                                    })
                                }
                                className="border rounded px-3 py-2"
                            />

                            <input
                                type="number"
                                placeholder="Kredit"
                                value={formEdit.kredit}
                                onChange={(e) =>
                                    setFormEdit({
                                        ...formEdit,
                                        kredit: e.target.value
                                    })
                                }
                                className="border rounded px-3 py-2"
                            />

                        </div>

                        <div className="flex justify-end gap-2">

                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleUpdate}
                                className="bg-violet-600 text-white px-4 py-2 rounded"
                            >
                                Simpan
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default LaporanJurnal;