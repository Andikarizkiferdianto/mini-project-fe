import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Swal from "sweetalert2";


const TransaksiJurnal = () => {
    const [akunOptions, setAkunOptions] = useState([]);
    const [tanggal, setTanggal] = useState("");
    const [keterangan, setKeterangan] = useState("");

    const [rows, setRows] = useState([
        { kode_akun: "", nama_akun: "", debet: 0, kredit: 0 },
        { kode_akun: "", nama_akun: "", debet: 0, kredit: 0 },
        { kode_akun: "", nama_akun: "", debet: 0, kredit: 0 },
        { kode_akun: "", nama_akun: "", debet: 0, kredit: 0 },
        { kode_akun: "", nama_akun: "", debet: 0, kredit: 0 },
    ]);

    // GET OPTION AKUN
    useEffect(() => {
        fetch("http://localhost:8000/api/jurnal/options")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    setAkunOptions(data.data);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    // HANDLE SELECT AKUN
    const handleAkunChange = (index, value) => {
        const akun = akunOptions.find(
            (a) => a.kode_akun === value
        );

        const updated = [...rows];

        updated[index].kode_akun = akun?.kode_akun || "";
        updated[index].nama_akun = akun?.nama_akun || "";

        setRows(updated);
    };

    // HANDLE INPUT
    const handleInput = (index, field, value) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };

    const handleSubmit = async () => {
    try {
        for (const row of rows) {
            if (!row.kode_akun) continue;

            await fetch("http://localhost:8000/api/jurnal/transaksi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tanggal,
                    keterangan,
                    kode_akun: row.kode_akun,
                    nama_akun: row.nama_akun,
                    debet: row.debet,
                    kredit: row.kredit,
                    status: "Posting",
                }),
            });
        }

        Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Transaksi jurnal berhasil disimpan",
            confirmButtonColor: "#7c3aed",
        });

        setTanggal("");
        setKeterangan("");

        setRows([
            { kode_akun: "", nama_akun: "", debet: 0, kredit: 0 },
            { kode_akun: "", nama_akun: "", debet: 0, kredit: 0 },
            { kode_akun: "", nama_akun: "", debet: 0, kredit: 0 },
            { kode_akun: "", nama_akun: "", debet: 0, kredit: 0 },
            { kode_akun: "", nama_akun: "", debet: 0, kredit: 0 },
        ]);

    } catch (error) {
        console.log(error);

        Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Data gagal disimpan",
            confirmButtonColor: "#dc2626",
        });
    }
};

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-5 mt-16 space-y-6">

                <h1 className="text-3xl font-semibold">
                    Transaksi Jurnal
                </h1>

                {/* FORM */}
                <div className="bg-white rounded-xl shadow max-w-5xl mx-auto overflow-hidden">

                    <div className="bg-violet-600 text-white text-lg px-3 py-2 font-semibold">
                        Form Transaksi
                    </div>

                    <div className="p-6 grid grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm mb-1">
                                Tanggal Transaksi
                            </label>

                            <input
                                type="date"
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">
                                Keperluan
                            </label>

                            <input
                                type="text"
                                value={keterangan}
                                onChange={(e) => setKeterangan(e.target.value)}
                                placeholder="Masukkan keperluan transaksi"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>

                    </div>
                </div>

                {/* DETAIL JURNAL */}
                <div className="bg-white rounded-xl shadow max-w-5xl mx-auto overflow-hidden">

                    <div className="bg-violet-600 px-3 py-2 font-bold text-lg text-white">
                        Detail Jurnal
                    </div>

                    <div className="p-6 space-y-3">

                        <div className="grid grid-cols-3 gap-4 font-bold text-sm">
                            <div>Akun</div>
                            <div>Debit</div>
                            <div>Kredit</div>
                        </div>

                        {rows.map((row, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-3 gap-4"
                            >
                                {/* AKUN */}
                                <select
                                    value={row.kode_akun}
                                    onChange={(e) =>
                                        handleAkunChange(i, e.target.value)
                                    }
                                    className="border border-gray-300 rounded px-3 py-2"
                                >
                                    <option value="">
                                        -- Pilih Akun --
                                    </option>

                                    {akunOptions.map((akun, index) => (
                                        <option
                                            key={index}
                                            value={akun.kode_akun}
                                        >
                                            {akun.display}
                                        </option>
                                    ))}
                                </select>

                                {/* DEBET */}
                                <input
                                    type="number"
                                    value={row.debet}
                                    onChange={(e) =>
                                        handleInput(
                                            i,
                                            "debet",
                                            e.target.value
                                        )
                                    }
                                    className="border border-gray-300 rounded px-3 py-2"
                                />

                                {/* KREDIT */}
                                <input
                                    type="number"
                                    value={row.kredit}
                                    onChange={(e) =>
                                        handleInput(
                                            i,
                                            "kredit",
                                            e.target.value
                                        )
                                    }
                                    className="border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                        ))}

                        <div className="flex justify-end pt-4">
                            <button
                                onClick={handleSubmit}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg shadow"
                            >
                                Submit
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default TransaksiJurnal;