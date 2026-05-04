import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

const DistribusiJam = () => {
  const [tahun, setTahun] = useState("2025/2026");

  const dataDummy = [
    
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 mt-16">
        

        <h1 className="text-2xl font-semibold mb-6">
          Distribusi Jam Mengajar
        </h1>

        {/* filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <label className="block text-sm mb-2">Tahun Ajaran</label>
          <select
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            className="border px-3 py-2 rounded w-64"
          >
            <option>-- Pilih Tahun Ajaran --</option>

          </select>
        </div>


        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="mb-4 font-medium">
            Grafik Distribusi Jam Mengajar
          </h2>

          <div className="space-y-4">
            {dataDummy.map((item, index) => (
              <div key={index}>
                <div className="text-sm mb-1">{item.nama_guru}</div>

                <div className="w-full bg-gray-200 h-5 rounded">
                  <div
                    className="h-5 bg-blue-400 rounded transition-all duration-700"
                    style={{
                      width: `${item.total_jam * 15}%`,
                    }}
                  ></div>
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  {item.total_jam} Jam {item.total_menit} Menit
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* tabel */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="mb-4 font-medium">
            Tabel Distribusi Jam Mengajar
          </h2>

          <table className="w-full text-sm border">
            <thead className="bg-gray-200 ">
              <tr>
                <th className="p-2">No</th>
                <th className="p-2 text-left">Nama Guru</th>
                <th className="p-2 text-left">Total Jam</th>
              </tr>
            </thead>

            <tbody>
                <tr className="text-center border-t">
                  <td className="p-2"></td>
                  <td className="p-2 text-left"></td>
                  <td className="p-2 text-left"></td>
                </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default DistribusiJam;