import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";

const PengembalianBuku = () => {

    const [loanData, setLoanData] = useState([]);

    const fetchData = async () => {

        try {

            const res = await axios.get(
                "http://localhost:8000/api/peminjaman"
            );

            const filtered = res.data.data.filter(
                (item) => item.status === "Dipinjam"
            );

            setLoanData(filtered);

        } catch (err) {

            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleKembalikan = async (id) => {

        try {

            await axios.put(
                `http://localhost:8000/api/peminjaman/${id}`,
                {
                    status: "Dikembalikan"
                }
            );

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Buku berhasil dikembalikan"
            });

            fetchData();

        } catch (err) {

            console.error(err);

            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Terjadi kesalahan"
            });
        }
    };

    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 p-6 bg-gray-50 min-h-screen mt-16">

                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow border border-gray-200 overflow-hidden">

                    <div className="bg-violet-600 text-white px-4 py-3 font-semibold">
                        Daftar Pengembalian Buku
                    </div>

                    <div className="p-4 overflow-x-auto">

                        {loanData.length === 0 ? (

                            <div className="bg-cyan-100 border border-cyan-200 rounded p-4">
                                Tidak ada peminjaman buku.
                            </div>

                        ) : (

                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">                             
                            <thead className="bg-violet-600 text-white text-center">
                                    <tr>
                                        <th className=" p-3">Nama</th>
                                        <th className=" p-3">Buku</th>
                                        <th className=" p-3">Jumlah</th>
                                        <th className=" p-3">Tgl Pinjam</th>
                                        <th className=" p-3">Tgl Kembali</th>
                                        <th className=" p-3">Aksi</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {loanData.map((item) => (

                                        <tr key={item.id}>

                                            <td className="p-3">
                                                {item.nama}
                                            </td>

                                            <td className="p-3">
                                                {item.buku}
                                            </td>

                                            <td className="p-3 text-center">
                                                {item.jumlah}
                                            </td>

                                            <td className="p-3 text-center">
                                                {item.tgl_pinjam}
                                            </td>

                                            <td className="p-3 text-center">
                                                {item.tgl_kembali}
                                            </td>

                                            <td className="p-3 text-center">

                                                <button
                                                    onClick={() => handleKembalikan(item.id)}
                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                                >
                                                    Kembalikan
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PengembalianBuku;