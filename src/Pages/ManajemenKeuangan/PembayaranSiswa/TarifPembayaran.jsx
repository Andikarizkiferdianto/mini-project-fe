import React from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";

const TarifPembayaran = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">

                <h1 className="text-lg font-semibold">
                    Tarif Pembayaran Siswa
                </h1>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">

                    {/* baris input */}
                    <div className="flex items-end gap-4">

                        <div className="flex-1">
                            <label className="block text-sm mb-1">Kelas</label>
                            <select className="w-full border border-gray-200 rounded px-3 py-2">
                                <option>Pilih</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm mb-1">Tahun Ajaran</label>
                            <select className="w-full border border-gray-200 rounded px-3 py-2">
                                <option>Pilih</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm mb-1">Tipe Bayar</label>
                            <select className="w-full border border-gray-200 rounded px-3 py-2">
                                <option>Pilih</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm mb-1">Jenis Bayar</label>
                            <select className="w-full border border-gray-200 rounded px-3 py-2">
                                <option>Pilih</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm mb-1">Nama Siswa</label>
                            <input
                                type="text"
                                placeholder="Cari nama siswa"
                                className="w-full border border-gray-200 rounded px-3 py-2"
                            />
                        </div>

                    </div>

                    {/* tombol di bawah */}
                    <div>
                        <button className="text-white px-3 py-2 rounded bg-violet-600 hover:bg-violet-700">
                            + Tambah
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default TarifPembayaran;