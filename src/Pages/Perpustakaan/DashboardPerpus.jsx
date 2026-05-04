import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Book, Tag, AlertTriangle, Star, 
    ArrowUpFromLine, Clock, CheckSquare, BarChart3, PieChart 
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    PieChart as RePieChart, Pie, Cell 
} from 'recharts';
import Sidebar from '../../components/Sidebar';

const DashboardPerpus = () => {
    const [stats, setStats] = useState({
        total_buku: 0,
        total_kategori: 0,
        stok_minim: 0,
        sedang_dipinjam: 0,
        sudah_kembali: 0,
        total_peminjaman: 0,
        buku_populer: "-",
        populer_count: 0
    });

    // Data dummy untuk grafik (nanti bisa kamu buatkan API-nya di backend)
    const chartData = [
        { name: 'Des 2025', jumlah: 0 },
        { name: 'Jan 2026', jumlah: 0 },
        { name: 'Feb 2026', jumlah: 0 },
        { name: 'Mar 2026', jumlah: 0 },
        { name: 'Apr 2026', jumlah: 1 },
        { name: 'Mei 2026', jumlah: stats.total_peminjaman },
    ];

    const pieData = [
        { name: 'Dipinjam', value: stats.sedang_dipinjam, color: '#f59e0b' },
        { name: 'Dikembalikan', value: stats.sudah_kembali, color: '#10b981' },
    ];

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/dashboard-perpus');
            const data = response.data;
            setStats({
                total_buku: data.total_buku || 0,
                total_kategori: data.total_kategori || 0,
                stok_minim: data.stok_minim || 0,
                sedang_dipinjam: data.sedang_dipinjam || 0,
                sudah_kembali: data.sudah_dikembalikan || 0,
                total_peminjaman: data.total_peminjaman || 0,
                buku_populer: data.buku_terpopuler?.judul || "-",
                populer_count: data.buku_terpopuler?.jumlah || 0
            });
        } catch (error) {
            console.error("Gagal sinkron data:", error);
        }
    };

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar />

            <div className="flex-1 p-8 mt-12">
                <h1 className="text-xl font-bold text-[#1e40af] mb-6 flex items-center gap-2">
                    <BarChart3 size={24} /> Dashboard Perpustakaan
                </h1>

                {/* Row 1: Statistik Utama */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Total Buku" value={stats.total_buku} icon={<Book size={32} className="text-blue-500" />} color="border-blue-500" />
                    <StatCard title="Total Kategori Buku" value={stats.total_kategori} icon={<Tag size={32} className="text-cyan-500" />} color="border-cyan-400" />
                    <StatCard title="Stok Minim (≤ 3)" value={stats.stok_minim} icon={<AlertTriangle size={32} className="text-amber-500" />} color="border-amber-400" />
                    <StatCard title="Buku Terpopuler" value={stats.buku_populer} icon={<Star size={32} className="fill-green-600 text-green-600" />} color="border-green-700" subtitle={`Dipinjam: ${stats.populer_count} kali`} />
                </div>

                {/* Row 2: Status Transaksi */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Total Peminjaman" value={stats.total_peminjaman} icon={<ArrowUpFromLine size={32} className="text-gray-500" />} color="border-gray-500" />
                    <StatCard title="Sedang Dipinjam" value={stats.sedang_dipinjam} icon={<Clock size={32} className="text-amber-500" />} color="border-amber-500" />
                    <StatCard title="Sudah Dikembalikan" value={stats.sudah_kembali} icon={<CheckSquare size={32} className="text-green-600" />} color="border-green-600" />
                </div>

                {/* Row 3: Charts */}
                <div className="space-y-6">
                    {/* Bar Chart */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                        <div className="bg-[#2563eb] px-4 py-2 flex items-center gap-2 text-white font-semibold">
                            <BarChart3 size={18} /> Peminjaman 6 Bulan Terakhir
                        </div>
                        <div className="p-4 h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{fill: '#f1f5f9'}} />
                                    <Legend iconType="rect" verticalAlign="top" align="center" height={36}/>
                                    <Bar dataKey="jumlah" name="Jumlah Peminjaman" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart / Status */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                        <div className="bg-[#06b6d4] px-4 py-2 flex items-center gap-2 text-white font-semibold">
                            <PieChart size={18} /> Status Peminjaman
                        </div>
                        <div className="p-4 h-64 flex justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <RePieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" align="center" />
                                </RePieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color, subtitle }) => (
    <div className={`bg-white rounded-lg shadow-sm border ${color} border-t-4 p-5 flex flex-col items-center justify-center text-center min-h-[160px]`}>
        <h3 className="text-gray-600 font-medium text-sm mb-2">{title}</h3>
        <span className="text-4xl font-bold text-gray-800 mb-4">{value}</span>
        <div className="flex flex-col items-center gap-1">
            {icon}
            {subtitle && <p className="text-[10px] text-gray-400 mt-1">{subtitle}</p>}
        </div>
    </div>
);

export default DashboardPerpus;