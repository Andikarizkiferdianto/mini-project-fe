import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

const DashboardGuru = () => {
  const [dataApi, setDataApi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard/stats')
      .then(res => {
        setDataApi(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal ambil data dashboard:", err);
        setLoading(false);
      });
  }, []);

  const stats = [
    {
      title: "Total Guru",
      value: dataApi?.guru?.total_guru || "0",
      color: "bg-blue-600",
      icon: "👤"
    },
    {
      title: "Mata Pelajaran",
      value: dataApi?.guru?.total_mapel || "0",
      color: "bg-green-700",
      icon: "📘"
    },
    {
      title: "Total Jam Mengajar",
      value: dataApi?.guru?.total_jam || "0",
      color: "bg-yellow-500",
      icon: "🕒"
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1e40af] text-center mb-1">
            Dashboard Guru
          </h1>
          <div className="w-20 h-1 bg-[#1e40af] mx-auto rounded-full"></div>
        </div>

        {/* STATS */}
        {loading ? (
          <p className="text-center text-gray-500">Mengambil data dari server...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {stats.map((item, index) => (
              <div
                key={index}
                className={`${item.color} rounded-2xl p-6 text-white shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
              >
                <div className="bg-white/20 p-3 rounded-full mb-3 text-2xl">
                  {item.icon}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-90 text-center">
                  {item.title}
                </p>
                <h3 className="text-3xl font-black">{item.value}</h3>
              </div>
            ))}
          </div>
        )}

         <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-bar-chart-2-line text-gray-600"></i>
            <h3 className="font-semibold text-gray-700">
              Distribusi Jam Mengajar
            </h3>
          </div>

          <div className="h-72 bg-gray-50 border rounded-lg flex flex-col justify-between p-4">

            {/* GRID */}
            <div className="flex-1 flex items-end gap-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex-1 border-l border-gray-200 h-full"></div>
              ))}
            </div>



            {/* jam mengajar*/}
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>0</span>
              <span>0.1</span>
              <span>0.2</span>
              <span>0.3</span>
              <span>0.4</span>
              <span>0.5</span>
              <span>0.6</span>
              <span>0.7</span>
              <span>0.8</span>
              <span>0.9</span>
              <span>1.0</span>
            </div>
          </div>
           <div className="mt-4 text-center text-xs text-gray-400">
            Total Jam
          </div>
        </div>

        {/* tabel mengajar */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">Jadwal Mengajar Mingguan</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Hari</th>
                  <th className="p-2 border">Jam</th>
                  <th className="p-2 border">Mata Pelajaran</th>
                  <th className="p-2 border">Guru</th>
                  <th className="p-2 border">Kelas</th>
                </tr>
              </thead>
              <tbody>
                {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map((hari, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-2 border">{hari}</td>
                    <td className="p-2 border italic text-gray-400">
                      Tidak ada jadwal
                    </td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardGuru;