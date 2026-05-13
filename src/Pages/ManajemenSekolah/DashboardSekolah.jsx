import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';

const DashboardSekolah = () => {
    const [view, setView] = useState('week');
    const [stats] = useState({
        users: 227,
        banner: 2,
        info: 2,
        backup: 1
    });

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">
                {/* --- STATS CARD --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow relative overflow-hidden">
                        <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Total Jumlah Aset</p>
                        <h1 className="text-5xl font-bold mt-3">{stats.users}</h1>
                        <i className="ri-stack-fill absolute right-5 top-5 text-6xl opacity-20"></i>
                    </div>
                    <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-2xl shadow relative overflow-hidden">
                        <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Total Kategori Aset</p>
                        <h1 className="text-5xl font-bold mt-3">{stats.banner}</h1>
                        <i className="ri-price-tag-3-fill absolute right-5 top-5 text-6xl opacity-20"></i>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-700 text-white p-6 rounded-2xl shadow relative overflow-hidden">
                        <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Total Surat & Dokumentasi</p>
                        <h1 className="text-5xl font-bold mt-3">{stats.info}</h1>
                        <i className="ri-file-list-3-fill absolute right-5 top-5 text-6xl opacity-20"></i>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white p-6 rounded-2xl shadow relative overflow-hidden">
                        <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Total Kegiatan Sekolah</p>
                        <h1 className="text-5xl font-bold mt-3">{stats.backup}</h1>
                        <i className="ri-calendar-event-fill absolute right-5 top-5 text-6xl opacity-20"></i>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    {/* Jumlah Aset per Kategori */}
                    <div className="bg-white rounded-2xl shadow p-6 h-80">
                        <h2 className="text-base font-semibold text-blue-600 mb-4">Jumlah Aset per Kategori</h2>
                        <div className="flex items-end justify-around h-60">
                            <div className="flex flex-col items-center">
                                <div className="w-12 bg-blue-600 rounded-t-lg h-48"></div>
                                <p className="text-sm mt-2">Elektronik</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 bg-blue-400 rounded-t-lg h-24"></div>
                                <p className="text-sm mt-2">Furniture</p>
                            </div>
                        </div>
                    </div>

                    {/* Aktivitas Riwayat Aset */}
                    <div className="bg-white rounded-2xl shadow p-6 h-80 flex flex-col items-center">
                        <h2 className="text-base font-semibold text-blue-600 self-start">Aktivitas Riwayat Aset</h2>
                        <div className="w-48 h-48 rounded-full border-[32px] border-red-600 mt-6 shadow-sm"></div>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="w-6 h-3 bg-red-600"></div>
                            <p className="text-sm">Peminjaman</p>
                        </div>
                    </div>

                    {/* Jenis Surat & Dokumentasi */}
                    <div className="bg-white rounded-2xl shadow p-6 h-80 flex flex-col items-center">
                        <h2 className="text-base font-semibold text-blue-600 self-start">Jenis Surat & Dokumentasi</h2>
                        <div className="w-48 h-48 rounded-full bg-green-500 mt-6 shadow-sm"></div>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="w-6 h-3 bg-green-500"></div>
                            <p className="text-sm">Masuk</p>
                        </div>
                    </div>
                </div>

                {/* --- KALENDER SECTION --- */}
                <div className="bg-white rounded-2xl shadow mt-8 p-6">
                    <h2 className="font-semibold text-xl mb-4 text-slate-800">Kegiatan Sekolah</h2>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-1">
                            <button className="bg-slate-800 text-white px-3 py-2 rounded-l"><i className="ri-arrow-left-s-line"></i></button>
                            <button className="bg-slate-800 text-white px-3 py-2 rounded-r border-l border-slate-600"><i className="ri-arrow-right-s-line"></i></button>
                            <button className="bg-slate-500 text-white px-4 py-2 rounded ml-2 text-sm">today</button>
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

                    {/* month */}
                    {view === 'month' && (
                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                            <table className="w-full border-collapse text-center">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <th key={d} className="border border-gray-200 p-3 font-semibold">{d}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(5)].map((_, r) => (
                                        <tr key={r}>
                                            {[...Array(7)].map((_, c) => <td key={c} className="border border-gray-200 h-24 align-top text-right pr-3 pt-2">{r * 7 + c + 1 <= 31 ? r * 7 + c + 1 : ''}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* week */}
                    {view === 'week' && (
                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                            {/* Tambahkan max-h supaya bisa di-scroll ke bawah melihat jam malam */}
                            <div className="max-h-[600px] overflow-y-auto">
                                <table className="w-full border-collapse">
                                    <thead className="sticky top-0 z-10 bg-white">
                                        <tr className="bg-white">
                                            <th className="border-b border-r border-gray-200 w-20 bg-white"></th>
                                            {['Sun 5/10', 'Mon 5/11', 'Tue 5/12', 'Wed 5/13', 'Thu 5/14', 'Fri 5/15', 'Sat 5/16'].map((day, i) => (
                                                <th key={i} className={`border-b border-r border-gray-200 p-3 text-blue-600 font-semibold text-sm ${i === 2 ? 'bg-yellow-50' : ''}`}>
                                                    {day}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Baris All-day */}
                                        <tr>
                                            <td className="border-b border-r border-gray-200 p-2 text-xs text-gray-500 text-center font-bold">all-day</td>
                                            {[...Array(7)].map((_, i) => (
                                                <td key={i} className={`border-b border-r border-gray-200 h-10 ${i === 2 ? 'bg-yellow-50' : ''}`}></td>
                                            ))}
                                        </tr>

                                        {/* Array disamakan menjadi 24 jam */}
                                        {[...Array(24)].map((_, index) => {
                                            const hour = index % 12 === 0 ? 12 : index % 12;
                                            const ampm = index < 12 ? 'am' : 'pm';
                                            const timeLabel = `${hour}${ampm}`;

                                            return (
                                                <tr key={index}>
                                                    <td className="border-b border-r border-gray-200 p-2 text-xs text-gray-500 text-center font-medium">
                                                        {timeLabel}
                                                    </td>
                                                    {[...Array(7)].map((_, i) => (
                                                        <td
                                                            key={i}
                                                            className={`border-b border-r border-gray-200 h-14 hover:bg-blue-50 transition-colors ${i === 2 ? 'bg-yellow-50/50' : ''}`}
                                                        >
                                                            {/* Slot untuk isi kegiatan */}
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* day */}
                    {view === 'day' && (
                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                            <div className="max-h-[600px] overflow-y-auto">
                                <table className="w-full border-collapse">
                                    <thead className="sticky top-0 z-10 bg-white">
                                        <tr>
                                            <th className="border-b border-r border-gray-200 w-20 bg-white"></th>
                                            <th className="border-b border-gray-200 p-3 text-blue-600 font-semibold text-sm">
                                                <span className="underline decoration-2 underline-offset-4">Tuesday</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Baris All-day */}
                                        <tr>
                                            <td className="border-b border-r border-gray-200 p-2 text-xs text-gray-500 text-center font-bold">
                                                all-day
                                            </td>
                                            <td className="border-b border-gray-200 h-10 bg-yellow-50/50"></td>
                                        </tr>

                                        {/* Loop Jam 12am - 11pm */}
                                        {[...Array(24)].map((_, index) => {
                                            const hour = index % 12 === 0 ? 12 : index % 12;
                                            const ampm = index < 12 ? 'am' : 'pm';
                                            const timeLabel = `${hour}${ampm}`;

                                            return (
                                                <tr key={index}>
                                                    <td className="border-b border-r border-gray-200 p-2 text-xs text-gray-500 text-center font-medium">
                                                        {timeLabel}
                                                    </td>
                                                    <td className="border-b border-gray-200 h-14 bg-yellow-50/50 hover:bg-yellow-100 transition-colors">
                                                        {/* Slot kegiatan harian */}
                                                    </td>
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