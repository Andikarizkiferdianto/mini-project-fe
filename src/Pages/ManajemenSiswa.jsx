import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const ManajemenSiswa = () => {
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
        title: "Total Siswa", 
        value: dataApi?.akademik?.total_siswa_aktif || "0", 
        color: "bg-[#1e90ff]", 
        icon: "👥" 
    },
    { 
        title: "Total Kelas", 
        value: dataApi?.akademik?.total_kelas || "0", 
        color: "bg-[#00ced1]", 
        icon: "💻" 
    },
    { 
        title: "Total Jurusan", 
        value: dataApi?.akademik?.total_jurusan || "0", 
        color: "bg-[#4169e1]", 
        icon: "🏢" 
    },
    { 
        title: "Total Alumni", 
        value: dataApi?.akademik?.total_alumni || "0", 
        color: "bg-[#87ceeb]", 
        icon: "🎓" 
    },
    { 
        title: "Hadir Hari Ini", 
        value: dataApi?.grafik_kehadiran_hari_ini?.hadir || "0", 
        color: "bg-[#32cd32]", 
        icon: "🚪" 
    },
    { 
        title: "Sakit/Izin", 
        value: (dataApi?.grafik_kehadiran_hari_ini?.sakit + dataApi?.grafik_kehadiran_hari_ini?.izin) || "0", 
        color: "bg-[#ffdb58]", 
        icon: "👤" 
    },
    { 
        title: "Ekstrakurikuler", 
        value: dataApi?.akademik?.total_ekstrakurikuler || "0", 
        color: "bg-[#9370db]", 
        icon: "🗓️" 
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1e40af] text-center mb-1">
            Dashboard Manajemen Siswa
          </h1>
          <div className="w-20 h-1 bg-[#1e40af] mx-auto rounded-full"></div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Mengambil data dari server...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {stats.map((item, index) => (
              <div 
                key={index} 
                className={`${item.color} rounded-2xl p-6 text-white shadow-lg flex flex-col items-center justify-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
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

        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
          <h3 className="text-center font-bold text-gray-500 mb-6 tracking-wide">
            Grafik Absensi 7 Hari Terakhir
          </h3>
          
          <div className="relative h-64 w-full flex items-end justify-between px-4 border-b border-gray-200">
            {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
              <div key={i} className="flex flex-col items-center w-full">
                <div 
                  className="w-8 bg-blue-400/20 border-t-2 border-blue-500 rounded-t-sm transition-all duration-500 hover:bg-blue-500" 
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-[10px] text-gray-400 mt-2 italic">1{i+1}/04</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenSiswa;