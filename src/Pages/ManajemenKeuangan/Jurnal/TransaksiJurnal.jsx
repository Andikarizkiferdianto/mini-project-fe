import React from "react";
import Sidebar from "../../../components/Sidebar";

const TransaksiJurnal = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-5 mt-16 space-y-6">

                <h1 className="text-3xl font-semibold">
                    Transaksi Jurnal
                </h1>

                {/* form  */}
                <div className="bg-white rounded-xl shadow max-w-5xl mx-auto overflow-hidden">
                    <div className="bg-violet-600 text-white text-lg px-3 py-2 font-semibold">
                        Form Transaksi
                    </div>

                    <div className="p-6 grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm mb-1">Tanggal Transaksi</label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Keperluan</label>
                            <input
                                type="text"
                                placeholder="Masukkan keperluan transaksi"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                    </div>
                </div>

                {/* tabel bawah */}
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

                        {/* ROW */}
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="grid grid-cols-3 gap-4">

                                <select className="border border-gray-300 rounded px-3 py-2">
                                    <option>-- Pilih Akun --</option>
                                </select>

                                <input
                                    type="number"
                                    defaultValue="0"
                                    className="border border-gray-300 rounded px-3 py-2"
                                />

                                <input
                                    type="number"
                                    defaultValue="0"
                                    className="border border-gray-300 rounded px-3 py-2"
                                />

                            </div>
                        ))}

                        <div className="flex justify-end pt-4">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg shadow">
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