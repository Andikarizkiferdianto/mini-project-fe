import React from 'react';
import Img1 from "../assets/gallery1.png";

function Gallery() {
  const images = [
    {
      src: Img1,
      title: "Presentasi Sistem SAP",
      description: "Pemaparan keunggulan Sistem Akademik Pintar (SAP) untuk efisiensi administrasi sekolah.",
    },
    {
      src: Img1,
      title: "Demo Fitur Akademik",
      description: "Demonstrasi modul absensi, nilai, dan manajemen guru menggunakan platform SAP.",
    },
    {
      src: Img1,
      title: "Pelatihan Admin Sekolah",
      description: "Pendampingan teknis bagi staf admin untuk pengoperasian database sekolah yang terintegrasi.",
    },
    {
      src: Img1,
      title: "Go-Live Implementasi",
      description: "Peresmian penggunaan SAP secara menyeluruh untuk digitalisasi ekosistem pendidikan.",
    },
  ];

  return (
    <section id="dokumentasi" className="bg-white">
      {/* SEKSI DOKUMENTASI & KEGIATAN */}
      <div className="px-8 py-28 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-violet-900">
            Kegiatan Implementasi
          </h2>
          <p className="text-lg text-slate-600 mt-4">
            Langkah nyata digitalisasi sekolah bersama Sistem Akademik Pintar (SAP)
          </p>
        </div>

        {/* GRID GALERI */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mx-auto">
          {images.map((item, index) => (
            <div key={index} className="flex flex-col group h-full">
              {/* Wadah Gambar */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-video mb-6">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Teks Deskripsi */}
              <div className="space-y-2 flex-grow">
                <h3 className="text-xl font-bold text-violet-900 group-hover:text-violet-600 transition">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SEKSI SIAP TRANSFORMASI --- */}
      <div className="bg-[#0f172a] py-24 px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Siap Transformasi Sekolah Anda?
          </h2>
          
          <div className="space-y-4 mb-12">
            <p className="text-xl text-slate-300">
              Instalasi <span className="text-violet-400 font-bold text-2xl">Rp 1.000.000</span> 
              <span className="mx-3 text-slate-600">|</span> 
              Maintenance <span className="text-violet-400 font-bold text-2xl">Rp 300.000/bulan</span>
            </p>
            <p className="text-slate-400 italic text-lg">
              Bergabunglah dengan ratusan sekolah yang telah mempercayakan manajemen mereka kepada SAP.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-10 rounded-2xl transition duration-300 shadow-xl shadow-violet-500/20 w-full sm:w-auto text-lg">
              Mulai Sekarang
            </button>
            <button className="bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 px-10 rounded-2xl transition duration-300 w-full sm:w-auto text-lg">
              Lihat Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;