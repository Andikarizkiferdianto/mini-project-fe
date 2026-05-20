import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';

const DashboardSekolah = () => {
    const [view, setView] = useState('week');
    
    // State utama penampung data dinamis dari Backend
    const [dashboardData, setDashboardData] = useState({
        counters: {
            total_aset: 0,
            total_kategori: 0,
            total_surat_dokumen: 0,
            total_kegiatan: 0
        },
        charts: {
            aset_per_kategori: [],
            jenis_surat: []
        },
        events: []
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ambil data dari API Falcon SAP
    useEffect(() => {
        fetch('http://localhost:8000/api/dashboard-manajemen-sekolah') 
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Gagal mengambil data dashboard (Status: ${res.status})`);
                }
                return res.json();
            })
            .then((data) => {
                if (data.status === 'success') {
                    setDashboardData(data);
                } else {
                    throw new Error(data.message || 'Terjadi kesalahan sistem backend');
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex bg-gray-100 min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg font-semibold text-slate-600 animate-pulse">Memuat Data Dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex bg-gray-100 min-h-screen items-center justify-center p-4">
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md w-full border border-red-100">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                        <i className="ri-error-warning-line"></i>
                    </div>
                    <p className="text-red-600 font-bold text-lg mb-1">Koneksi API Gagal</p>
                    <p className="text-gray-500 text-sm mb-4">{error}</p>
                    <p className="text-xs text-gray-400 bg-gray-50 p-2 rounded">
                        Pastikan server backend Python berjalan di port 8000.
                    </p>
                </div>
            </div>
        );
    }

    const { counters, charts, events } = dashboardData;

    // Helper untuk memetakan kegiatan berdasarkan tanggal (Format DB: YYYY-MM-DD)
    const getEventsForDay = (dayNumber) => {
        const formattedDate = `2026-05-${String(dayNumber).padStart(2, '0')}`;
        return events.filter(event => event.start.startsWith(formattedDate));
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">
                {/* --- STATS CARD SECTION --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow relative overflow-hidden">
                        <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Total Jumlah Aset</p>
                        <h1 className="text-5xl font-bold mt-3">{counters.total_aset}</h1>
                        <i className="ri-stack-fill absolute right-5 top-5 text-6xl opacity-20"></i>
                    </div>
                    <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-2xl shadow relative overflow-hidden">
                        <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Total Kategori Aset</p>
                        <h1 className="text-5xl font-bold mt-3">{counters.total_kategori}</h1>
                        <i className="ri-price-tag-3-fill absolute right-5 top-5 text-6xl opacity-20"></i>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-700 text-white p-6 rounded-2xl shadow relative overflow-hidden">
                        <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Total Surat & Dokumentasi</p>
                        <h1 className="text-5xl font-bold mt-3">{counters.total_surat_dokumen}</h1>
                        <i className="ri-file-list-3-fill absolute right-5 top-5 text-6xl opacity-20"></i>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white p-6 rounded-2xl shadow relative overflow-hidden">
                        <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Total Kegiatan Sekolah</p>
                        <h1 className="text-5xl font-bold mt-3">{counters.total_kegiatan}</h1>
                        <i className="ri-calendar-event-fill absolute right-5 top-5 text-6xl opacity-20"></i>
                    </div>
                </div>

                {/* --- GRAPH GRAPH SECTION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    {/* Bar Chart: Jumlah Aset per Kategori */}
                    <div className="bg-white rounded-2xl shadow p-6 h-80 flex flex-col">
                        <h2 className="text-base font-semibold text-blue-600 mb-4">Jumlah Aset per Kategori</h2>
                        <div className="flex-1 flex items-end justify-around px-2 overflow-x-auto pb-2">
                            {charts.aset_per_kategori && charts.aset_per_kategori.length > 0 ? (
                                charts.aset_per_kategori.map((item, index) => {
                                    const maxVal = counters.total_aset || 1;
                                    const percentage = Math.min((item.jumlah / maxVal) * 100, 100);
                                    return (
                                        <div key={index} className="flex flex-col items-center min-w-[60px]">
                                            <span className="text-xs font-semibold text-gray-500 mb-1">{item.jumlah}</span>
                                            <div 
                                                className="w-10 bg-blue-600 rounded-t-lg transition-all duration-500 hover:bg-blue-700"
                                                style={{ height: `${Math.max(percentage * 1.2, 8)}px` }} 
                                            ></div>
                                            <p className="text-xs mt-2 truncate w-16 text-center text-gray-600" title={item.kategori}>{item.kategori}</p>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-400 text-sm pb-10">Tidak ada data aset</p>
                            )}
                        </div>
                    </div>

                    {/* Aktivitas Riwayat Aset */}
                    <div className="bg-white rounded-2xl shadow p-6 h-80 flex flex-col items-center">
                        <h2 className="text-base font-semibold text-blue-600 self-start">Aktivitas Riwayat Aset</h2>
                        <div className="w-48 h-48 rounded-full border-[32px] border-red-600 mt-6 shadow-sm flex items-center justify-center">
                            <span className="text-xs text-gray-500 font-medium absolute">Placeholder</span>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="w-6 h-3 bg-red-600"></div>
                            <p className="text-sm text-gray-600">Peminjaman</p>
                        </div>
                    </div>

                    {/* List Group Chart: Jenis Surat & Dokumentasi */}
                    <div className="bg-white rounded-2xl shadow p-6 h-80 flex flex-col">
                        <h2 className="text-base font-semibold text-blue-600 mb-2">Jenis Surat & Dokumentasi</h2>
                        <div className="flex-1 overflow-y-auto space-y-3 mt-2 pr-1">
                            {charts.jenis_surat && charts.jenis_surat.length > 0 ? (
                                charts.jenis_surat.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between border-b pb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${index % 2 === 0 ? 'bg-green-500' : 'bg-emerald-600'}`}></div>
                                            <p className="text-sm capitalize font-medium text-gray-700">{item.jenis}</p>
                                        </div>
                                        <span className="bg-gray-100 text-gray-800 text-xs font-bold px-2.5 py-0.5 rounded-full">{item.jumlah} item</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm text-center mt-14">Tidak ada data arsip</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- KALENDER KEGIATAN SEKOLAH SECTION --- */}
                <div className="bg-white rounded-2xl shadow mt-8 p-6">
                    <h2 className="font-semibold text-xl mb-4 text-slate-800">Kegiatan Sekolah</h2>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-1">
                            <button className="bg-slate-800 text-white px-3 py-2 rounded-l hover:bg-slate-700"><i className="ri-arrow-left-s-line"></i></button>
                            <button className="bg-slate-800 text-white px-3 py-2 rounded-r border-l border-slate-600 hover:bg-slate-700"><i className="ri-arrow-right-s-line"></i></button>
                            <button className="bg-slate-500 text-white px-4 py-2 rounded ml-2 text-sm hover:bg-slate-600">today</button>
                        </div>

                        <h1 className="font-bold text-2xl text-slate-800">
                            {view === 'month' ? 'May 2026' : 'May 10 – 16, 2026'}
                        </h1>

                        <div className="flex bg-slate-800 rounded p-1 shadow-md">
                            <button onClick={() => setView('month')} className={`px-4 py-1 rounded text-sm transition ${view === 'month' ? 'bg-slate-600 text-white shadow-inner' : 'text-gray-400'}`}>month</button>
                            <button onClick={() => setView('week')} className={`px-4 py-1 rounded text-sm transition ${view === 'week' ? 'bg-slate-600 text-white shadow-inner' : 'text-gray-400'}`}>week</button>
                            <button onClick={() => setView('day')} className={`px-4 py-1 rounded text-sm transition ${view === 'day' ? 'bg-slate-600 text-white shadow-inner' : 'text-gray-400'}`}>day</button>
                        </div>
                    </div>

                    {/* View Month */}
                    {view === 'month' && (
                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                            <table className="w-full border-collapse text-center table-fixed">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <th key={d} className="border-r border-gray-200 p-3 font-semibold text-sm">{d}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(5)].map((_, r) => (
                                        <tr key={r} className="border-b border-gray-200 last:border-none">
                                            {[...Array(7)].map((_, c) => {
                                                const dayNumber = r * 7 + c + 1;
                                                const dayEvents = dayNumber <= 31 ? getEventsForDay(dayNumber) : [];
                                                return (
                                                    <td key={c} className="border-r border-gray-200 h-28 align-top text-right p-1 relative bg-white group hover:bg-gray-50 last:border-none">
                                                        <span className="font-bold text-sm text-gray-400 block mb-1 pr-1">{dayNumber <= 31 ? dayNumber : ''}</span>
                                                        <div className="overflow-y-auto max-h-20 space-y-1 text-left">
                                                            {dayEvents.map((ev, idx) => (
                                                                <div key={idx} className="bg-indigo-100 text-indigo-700 text-[10px] p-1 rounded truncate font-semibold" title={ev.title}>
                                                                    📍 {ev.title}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* View Week */}
                    {view === 'week' && (
                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                            <div className="max-h-[600px] overflow-y-auto">
                                <table className="w-full border-collapse">
                                    <thead className="sticky top-0 z-10 bg-white shadow-sm">
                                        <tr className="bg-white">
                                            <th className="border-b border-r border-gray-200 w-20 bg-white"></th>
                                            {['Sun 5/10', 'Mon 5/11', 'Tue 5/12', 'Wed 5/13', 'Thu 5/14', 'Fri 5/15', 'Sat 5/16'].map((day, i) => (
                                                <th key={i} className={`border-b border-r border-gray-200 p-3 text-blue-600 font-semibold text-sm ${i === 2 ? 'bg-yellow-50/50' : ''}`}>
                                                    {day}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200">
                                            <td className="border-r border-gray-200 p-2 text-xs text-gray-500 text-center font-bold bg-gray-50">all-day</td>
                                            {[...Array(7)].map((_, i) => {
                                                const currentDayNum = 10 + i;
                                                const dayEvents = getEventsForDay(currentDayNum);
                                                return (
                                                    <td key={i} className={`border-r border-gray-200 p-1 vertical-align-top ${i === 2 ? 'bg-yellow-50/30' : ''}`}>
                                                        {dayEvents.map((ev, idx) => (
                                                            <div key={idx} className="bg-indigo-600 text-white text-xs p-1.5 rounded my-1 shadow-sm font-semibold truncate" title={ev.title}>
                                                                {ev.title}
                                                            </div>
                                                        ))}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                        {[...Array(12)].map((_, index) => {
                                            const hour = (index + 7); 
                                            const timeLabel = hour >= 12 ? `${hour === 12 ? 12 : hour - 12}pm` : `${hour}am`;
                                            return (
                                                <tr key={index} className="border-b border-gray-100 last:border-none">
                                                    <td className="border-r border-gray-200 p-2 text-xs text-gray-400 text-center font-medium bg-gray-50">{timeLabel}</td>
                                                    {[...Array(7)].map((_, i) => (
                                                        <td key={i} className={`border-r border-gray-200 h-12 hover:bg-blue-50/30 transition-colors ${i === 2 ? 'bg-yellow-50/20' : ''}`}></td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* View Day */}
                    {view === 'day' && (
                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                            <div className="max-h-[600px] overflow-y-auto">
                                <table className="w-full border-collapse">
                                    <thead className="sticky top-0 z-10 bg-white shadow-sm">
                                        <tr>
                                            <th className="border-b border-r border-gray-200 w-20 bg-white"></th>
                                            <th className="border-b border-gray-200 p-3 text-blue-600 font-semibold text-sm text-left pl-6">
                                                <span className="underline decoration-2 underline-offset-4">Tuesday (May 12, 2026)</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200">
                                            <td className="border-r border-gray-200 p-2 text-xs text-gray-500 text-center font-bold bg-gray-50">all-day</td>
                                            <td className="p-2 bg-yellow-50/20">
                                                {getEventsForDay(12).map((ev, idx) => (
                                                    <div key={idx} className="bg-indigo-600 text-white text-sm p-2 rounded my-1 font-semibold shadow max-w-md">
                                                        🚀 {ev.title}
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                        {[...Array(12)].map((_, index) => {
                                            const hour = (index + 7);
                                            const timeLabel = hour >= 12 ? `${hour === 12 ? 12 : hour - 12}pm` : `${hour}am`;
                                            return (
                                                <tr key={index} className="border-b border-gray-100 last:border-none">
                                                    <td className="border-r border-gray-200 p-2 text-xs text-gray-400 text-center font-medium bg-gray-50">{timeLabel}</td>
                                                    <td className="h-12 bg-white hover:bg-gray-50 transition-colors"></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardSekolah;