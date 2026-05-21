import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';
import Swal from 'sweetalert2';

const InputNilaiKerja = () => {
    // State Filter
    const [tipe, setTipe] = useState('GURU');
    const [bulan, setBulan] = useState('May');
    const [tahun, setTahun] = useState('2026');

    // Data dari API
    const [headers, setHeaders] = useState([]);
    const [matrixData, setMatrixData] = useState([]);
    const [loading, setLoading] = useState(false);

    // State penampung perubahan nilai lokal sebelum di-save per baris
    // Format: { [id_guru_pegawai]: { [id_indikator]: nilai } }
    const [localScores, setLocalScores] = useState({});

    // Fetch matriks data dari backend
    const fetchMatrixKinerja = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/input-nilai-kinerja?tipe=${tipe}&bulan=${bulan}&tahun=${tahun}`);
            const result = await response.json();
            if (result.status === 'success') {
                setHeaders(result.headers);
                setMatrixData(result.data);

                // Buat mapping localScores awal dari data backend
                const initialScores = {};
                result.data.forEach(row => {
                    initialScores[row.id_guru_pegawai] = {};
                    result.headers.forEach(head => {
                        const cell = row.nilai_kinerja[head.key];
                        initialScores[row.id_guru_pegawai][head.id] = cell ? cell.nilai : 0;
                    });
                });
                setLocalScores(initialScores);
            }
        } catch (error) {
            console.error("Gagal mengambil matriks nilai kinerja:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatrixKinerja();
    }, [tipe, bulan, tahun]);

    // Handle perubahan input angka nilai di tabel
    const handleInputChange = (idGuru, idIndikator, value) => {
        setLocalScores(prev => ({
            ...prev,
            [idGuru]: {
                ...prev[idGuru],
                [idIndikator]: value
            }
        }));
    };

    // Aksi Simpan Nilai per Pegawai/Guru
    const handleSaveRow = async (idGuru, namaGuru) => {
        const scoresToSend = localScores[idGuru] || {};

        try {
            const response = await fetch('http://localhost:8000/api/input-nilai-kinerja', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_guru_pegawai: idGuru,
                    bulan: bulan,
                    tahun: parseInt(tahun),
                    scores: scoresToSend
                })
            });
            const result = await response.json();

            if (result.status === 'success') {
                Swal.fire({
                    title: 'Berhasil!',
                    text: `Nilai kinerja untuk ${namaGuru} berhasil disimpan.`,
                    icon: 'success',
                    confirmButtonColor: '#7c3aed',
                    customClass: { popup: 'rounded-xl font-sans' }
                });
                fetchMatrixKinerja(); // Refresh data terbaru
            } else {
                Swal.fire('Gagal!', result.message, 'error');
            }
        } catch (error) {
            Swal.fire('Sistem Error!', 'Gagal menyimpan nilai ke server.', 'error');
        }
    };

    return (
        <div className="flex w-full min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-4 mt-12 overflow-x-auto">
                <div className="bg-white rounded-lg border border-gray-300 overflow-hidden mt-5 w-full">

                    <div className="bg-violet-600 px-4 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <h1 className="text-white font-bold text-lg md:text-xl flex items-center gap-2">
                            <i className="ri-medal-fill"></i> Input Kinerja {tipe === 'GURU' ? 'Guru' : 'Pegawai'}
                        </h1>

                        <div className="flex flex-wrap gap-2 w-full md:w-auto">
                            <select 
                                value={tipe} 
                                onChange={(e) => setTipe(e.target.value)}
                                className="border bg-white rounded px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-violet-300"
                            >
                                <option value="GURU">Guru</option>
                                <option value="PEGAWAI">Pegawai / Staf</option>
                            </select>

                            <select 
                                value={bulan} 
                                onChange={(e) => setBulan(e.target.value)}
                                className="border bg-white rounded px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-violet-300"
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
                                <option value="October">Oktobor</option>
                                <option value="November">November</option>
                                <option value="December">Desember</option>
                            </select>

                            <select 
                                value={tahun} 
                                onChange={(e) => setTahun(e.target.value)}
                                className="border bg-white rounded px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-violet-300"
                            >
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                            </select>
                        </div>
                    </div>

                    {/* DYNAMIC MATRIX TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-violet-100 text-violet-900 border-b border-gray-300">
                                    <th rowSpan="2" className="border border-gray-300 px-3 py-3 w-12 text-center">No</th>
                                    <th rowSpan="2" className="border border-gray-300 px-3 py-3 text-left min-w-[200px]">Nama Lengkap</th>
                                    <th colSpan={headers.length} className="border border-gray-300 px-3 py-3 text-center">Indikator Kinerja</th>
                                    <th rowSpan="2" className="border border-gray-300 px-3 py-3 w-28 text-center">Aksi</th>
                                </tr>
                                <tr className="bg-violet-100 text-violet-900 border-b border-gray-300">
                                    {headers.map(head => (
                                        <th key={head.id} className="border border-gray-300 px-3 py-3 text-center min-w-[110px]">
                                            {head.nama}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={headers.length + 3} className="p-6 text-center text-gray-500">
                                            <i className="ri-loader-4-line animate-spin mr-1"></i> Memuat matriks penilaian...
                                        </td>
                                    </tr>
                                ) : matrixData.length === 0 ? (
                                    <tr>
                                        <td colSpan={headers.length + 3} className="p-6 text-center text-gray-500">
                                            Tidak ada data kepegawaian ditemukan untuk tipe ini.
                                        </td>
                                    </tr>
                                ) : (
                                    matrixData.map((row, index) => (
                                        <tr key={row.id_guru_pegawai} 
                                        className="hover:bg-gray-50 transition border-b border-gray-200">
                                            <td  className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-600">
                                                {index + 1}
                                            </td>
                                            <td className="border border-gray-300 px-3 py-2 font-semibold text-gray-800">
                                                {row.nama_guru}
                                            </td>


                                            {headers.map(head => {
                                                const currentVal = localScores[row.id_guru_pegawai]?.[head.id] ?? '';
                                                return (
                                                    <td key={head.id}
                                                     className="border border-gray-300 px-2 py-1.5">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            step="0.1"
                                                            value={currentVal}
                                                            onChange={(e) => handleInputChange(row.id_guru_pegawai, head.id, e.target.value)}
                                                            placeholder="0"
                                                            className="w-full border border-gray-300 rounded px-2 py-1 text-center font-medium text-gray-800 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                                                        />
                                                    </td>
                                                );
                                            })}

                                            {/* Tombol Simpan Baris */}
                                            <td className="border border-gray-300 px-2 py-1.5 text-center">
                                                <button 
                                                    onClick={() => handleSaveRow(row.id_guru_pegawai, row.nama_guru)}
                                                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center justify-center gap-1 mx-auto shadow-sm transition"
                                                >
                                                    <i className="ri-save-fill"></i> Simpan
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default InputNilaiKerja;