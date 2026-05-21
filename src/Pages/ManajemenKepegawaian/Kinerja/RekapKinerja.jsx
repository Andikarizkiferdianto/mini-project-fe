import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';

const RekapKinerja = () => {
    // State Filter & Data
    const [tipe, setTipe] = useState('GURU');
    const [bulan, setBulan] = useState('May');
    const [tahun, setTahun] = useState('2026');

    const [headers, setHeaders] = useState([]);
    const [rekapData, setRekapData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    // Fetch data rekap dari Falcon API
    const fetchRekapKinerja = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/rekap-nilai-kinerja?tipe=${tipe}&bulan=${bulan}&tahun=${tahun}`);
            const result = await response.json();
            if (result.status === 'success') {
                setHeaders(result.headers);
                setRekapData(result.data);
            }
        } catch (error) {
            console.error("Gagal mengambil data rekap kinerja:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRekapKinerja();
    }, [tipe, bulan, tahun]);

    // Client-side Search Filter berdasarkan nama guru
    const filteredData = rekapData.filter(item =>
        item.nama_guru.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex w-full min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-4 mt-12 overflow-x-auto">
                <div className="bg-white rounded-lg border border-gray-300 overflow-hidden mt-5 w-full">
                    <div className="bg-green-700 px-4 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <h1 className="text-white font-bold text-lg md:text-xl flex items-center gap-2">
                            <i className="ri-file-chart-fill"></i> Rekap Kinerja {tipe === 'GURU' ? 'Guru' : 'Pegawai'}
                        </h1>

                        <div className="flex flex-wrap gap-2 w-full md:w-auto">
                            <select
                                value={tipe}
                                onChange={(e) => setTipe(e.target.value)}
                                className="border bg-white rounded px-3 py-1.5 text-sm font-medium outline-none"
                            >
                                <option value="GURU">Guru</option>
                                <option value="PEGAWAI">Pegawai / Staf</option>
                            </select>

                            <select
                                value={bulan}
                                onChange={(e) => setBulan(e.target.value)}
                                className="border bg-white rounded px-3 py-1.5 text-sm font-medium outline-none"
                            >
                                <option value="January">Januari</option>
                                <option value="February">Februari</option>
                                <option value="March">Maret</option>
                                <option value="April">April</option>
                                <option value="May">Mei</option>
                                <option value="June">Juni</option>
                                <option value="July">Juli</option>
                                <option value="August">Agustus</option>
                                <option value="September">September</option>
                                <option value="October">Oktober</option>
                                <option value="November">November</option>
                                <option value="December">Desember</option>
                            </select>

                            <select
                                value={tahun}
                                onChange={(e) => setTahun(e.target.value)}
                                className="border bg-white rounded px-3 py-1.5 text-sm font-medium outline-none"
                            >
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                            </select>
                        </div>
                    </div>

                    {/* ACTION BUTTONS & SEARCH */}
                    <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 gap-3 border-b border-gray-200 bg-gray-50">
                        <div className="flex flex-wrap gap-1 w-full sm:w-auto">
                            {["Copy", "CSV", "Excel", "PDF", "Print"].map((btn) => (
                                <button
                                    key={btn}
                                    className="border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium rounded hover:bg-gray-100 shadow-sm transition"
                                >
                                    {btn}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <label className="text-sm font-medium text-gray-600">Search:</label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama..."
                                className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-green-600 w-full sm:w-48"
                            />
                        </div>
                    </div>

                    {/* TABLE CONTAINER */}
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse text-sm table-auto min-w-max">
                            <thead>
                                <tr className="bg-green-50 text-green-900">
                                    <th rowSpan="2" className="border border-gray-300 px-3 py-3 w-12 text-center font-bold">No</th>
                                    <th rowSpan="2" className="border border-gray-300 px-4 py-3 text-left min-w-[180px] font-bold">Nama Lengkap</th>
                                    <th colSpan={headers.length} className="border border-gray-300 px-2 py-2 text-center font-bold">Indikator Kinerja</th>
                                    <th rowSpan="2" className="border border-gray-300 px-4 py-3 text-center min-w-[100px] font-bold bg-green-100">Rata-rata</th>
                                </tr>
                                <tr className="bg-green-50 text-green-900">
                                    {/* Render Sub-Header Indikator secara Dinamis */}
                                    {headers.map((head, i) => (
                                        <th key={i} className="border border-gray-300 px-3 py-2 text-center font-semibold min-w-[110px]">
                                            {head.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((row, index) => (
                                    <tr key={index}
                                        className="hover:bg-gray-50 transition border-b border-gray-200">
                                        <td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-600">
                                            {index + 1}</td>
                                        <td className="border border-gray-300 px-3 py-2 font-semibold text-gray-800">
                                            {row.nama_guru}</td>

                                        {/* INI BAGIAN DINAMISNYA */}
                                        {headers.map((h) => (
                                            <td key={h.id}
                                                className="border border-gray-300 px-2 py-1.5">
                                                {row[`ind_${h.id}`]}
                                            </td>
                                        ))}

                                        <td
                                            className="border border-gray-300 px-2 py-1.5">
                                            {row.rata_rata}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* FOOTER PAGINATION (Static View) */}
                    <div className="flex justify-between items-center px-4 py-3 text-sm bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-600">Showing {filteredData.length} entries</p>
                        <div className="flex items-center gap-1">
                            <button className="px-3 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-100 disabled:opacity-50 text-xs font-medium">Previous</button>
                            <button className="border border-green-600 px-3 py-1.5 bg-green-700 text-white rounded text-xs font-bold">1</button>
                            <button className="px-3 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-100 disabled:opacity-50 text-xs font-medium">Next</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RekapKinerja;