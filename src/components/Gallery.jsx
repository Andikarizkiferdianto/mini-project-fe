import React from 'react';
import { Link } from 'react-router-dom';
import Presentasi from '../assets/Presentasi.jpg'
import DemoFitur from '../assets/DemoFitur.jpg'
import PelatihAdmin from '../assets/PelatihAdmin.jpg'
import GoLive from '../assets/GoLive.jpg'

function Gallery() {
  const scrollToSection = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const images = [
    {
      src: Presentasi,
      title: "Presentasi Sistem SAP",
      description: "Pemaparan keunggulan Sistem Akademik Pintar (SAP) untuk efisiensi administrasi sekolah.",
    },
    {
      src: DemoFitur,
      title: "Demo Fitur Unggulan",
      description: "Simulasi penggunaan modul akademik dan absensi real-time di hadapan jajaran pengurus sekolah.",
    },
    {
      src: PelatihAdmin,
      title: "Pelatihan Admin Sekolah",
      description: "Pendampingan intensif bagi staf administrasi untuk penguasaan dashboard manajemen SAP.",
    },
    {
      src: GoLive,
      title: "Implementasi Go-Live",
      description: "Peresmian penggunaan sistem secara penuh untuk mendukung operasional harian sekolah.",
    },
  ];

  return (
    <section id="dokumentasi" className="bg-white">
      <div className="px-8 py-28 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-violet-900">
            Kegiatan Implementasi
          </h2>
          <p className="text-lg text-slate-600 mt-4">
            Langkah nyata digitalisasi sekolah bersama Sistem Akademik Pintar (SAP)
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mx-auto">
          {images.map((item, index) => (
            <div key={index} className="flex flex-col group h-full">
              <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-video mb-6">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>

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
            <button 
              onClick={() => scrollToSection("kontak")}
              className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-10 rounded-2xl transition duration-300 shadow-xl shadow-violet-500/20 w-full sm:w-auto text-lg transform hover:-translate-y-1"
            >
              Mulai Sekarang
            </button>
            <Link 
            to="/login"
            className="bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 px-10 rounded-2xl transition duration-300 w-full sm:w-auto text-lg transform hover:-translate-y-1 block text-center"
            >
              Lihat Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;