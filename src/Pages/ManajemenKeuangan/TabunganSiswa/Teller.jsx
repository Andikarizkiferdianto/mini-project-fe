import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../../../components/Sidebar";

const Teller = () => {
    const [summary, setSummary] = useState({ total_saldo: 0, total_penabung: 0 });
    const [riwayat, setRiwayat] = useState([]);
    const [formData, setFormData] = useState({ 
        nis: "", 
        jenis_transaksi: "Setoran", 
        nominal: "", 
        keterangan: "" 
    });

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/tabungan/teller");
            setSummary(res.data.summary);
            setRiwayat(res.data.riwayat_hari_ini);
        } catch (err) {
            console.error("Gagal memuat data", err);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/tabungan/teller", formData);
            
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Transaksi telah tersimpan.',
                showConfirmButton: false,
                timer: 1500
            });

            setFormData({ nis: "", jenis_transaksi: "Setoran", nominal: "", keterangan: "" });
            fetchData();
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: err.response?.data?.message || "Terjadi kesalahan sistem",
                confirmButtonColor: '#7c3aed'
            });
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-8 mt-16">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Teller Transaksi</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form Input */}
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-fit">
                        <h2 className="text-lg font-semibold mb-4 text-violet-600">Input Transaksi</h2>
                        <div className="space-y-4">
                            <input placeholder="NIS Siswa" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none" value={formData.nis} onChange={(e) => setFormData({...formData, nis: e.target.value})} required />
                            <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none" value={formData.jenis_transaksi} onChange={(e) => setFormData({...formData, jenis_transaksi: e.target.value})}>
                                <option value="Setoran">Setoran</option>
                                <option value="Penarikan">Penarikan</option>
                            </select>
                            <input type="number" placeholder="Nominal" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none" value={formData.nominal} onChange={(e) => setFormData({...formData, nominal: e.target.value})} required />
                            <input placeholder="Keterangan" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none" value={formData.keterangan} onChange={(e) => setFormData({...formData, keterangan: e.target.value})} />
                            <button type="submit" className="w-full bg-violet-600 text-white p-3 rounded-lg font-bold hover:bg-violet-700 transition-all shadow-md">Simpan Transaksi</button>
                        </div>
                    </form>

                    {/* Stats & Tabel */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg">
                                <p className="text-green-100 text-sm">Total Saldo</p>
                                <h2 className="text-2xl font-bold">Rp {summary.total_saldo.toLocaleString()}</h2>
                            </div>
                            <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
                                <p className="text-blue-100 text-sm">Total Penabung</p>
                                <h2 className="text-2xl font-bold">{summary.total_penabung} Siswa</h2>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-4 border-b font-bold text-gray-700 bg-gray-50">Riwayat Transaksi Hari Ini</div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="text-gray-600 text-sm">
                                        <tr>
                                            <th className="p-4">No</th>
                                            <th className="p-4">Nama</th>
                                            <th className="p-4">Jenis</th>
                                            <th className="p-4 text-right">Jumlah</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {riwayat.length > 0 ? riwayat.map((t, index) => (
                                            <tr key={index} className="border-t hover:bg-gray-50">
                                                <td className="p-4">{index + 1}</td>
                                                <td className="p-4 font-medium text-gray-800">{t.nama}</td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${t.jenis === 'Setoran' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {t.jenis}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right font-bold text-gray-800">{t.jumlah.toLocaleString()}</td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="4" className="p-8 text-center text-gray-400 italic">Belum ada transaksi hari ini</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Teller;