import React from "react";
import { Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";

const RekapPembayaran = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 mt-16 space-y-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden">

                    <div className="bg-violet-500 text-white px-4 py-3 font-semibold rounded-t">
                        Rekap Pembayaran 
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">

                        {/* baris input */}
                        <div className="flex items-end gap-4">

                            <div className="flex-1">
                                <label className="block text-sm mb-1">Kelas</label>
                                <select className="w-full border border-gray-200 rounded px-3 py-2">
                                    <option>Pilih Kelas</option>
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm mb-1">Tahun Ajaran</label>
                                <select className="w-full border border-gray-200 rounded px-3 py-2">
                                    <option>Pilih Tahun</option>
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm mb-1">Tipe Bayar</label>
                                <select className="w-full border border-gray-200 rounded px-3 py-2">
                                    <option>Pilih Tipe Bayar</option>
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm mb-1">Jenis Bayar</label>
                                <select className="w-full border border-gray-200 rounded px-3 py-2">
                                    <option>Pilih Jenis Bayar</option>
                                </select>
                            </div>

                             

                        </div>

                        {/* tombol di bawah */}
                        <div>
                            <button className="text-white px-3 py-2 rounded bg-violet-600 hover:bg-violet-700">
                                PILIH
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default RekapPembayaran;