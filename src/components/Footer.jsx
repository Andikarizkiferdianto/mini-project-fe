import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-violet-500/30">
                S
              </div>
              <span className="text-3xl font-black text-white tracking-tighter uppercase">
                SAP<span className="text-violet-500">.</span>
              </span>
            </div>
            <p className="text-lg leading-relaxed font-medium text-slate-400">
              Sistem Akademik Pintar terintegrasi untuk transformasi digital pendidikan Indonesia.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-8 text-xl border-b-2 border-violet-600 w-fit pb-1">Menu</h3>
            <ul className="space-y-4 text-lg font-semibold">
              <li><a href="#" className="hover:text-violet-400 transition">Beranda</a></li>
              <li><a href="#" className="hover:text-violet-400 transition">Tentang</a></li>
              <li><a href="#" className="hover:text-violet-400 transition">Modul</a></li>
              <li><a href="#" className="hover:text-violet-400 transition">Harga</a></li>
              <li><a href="#" className="hover:text-violet-400 transition">Dokumentasi</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-8 text-xl border-b-2 border-violet-600 w-fit pb-1">Paket Harga</h3>
            <ul className="space-y-4 text-lg font-semibold">
              <li><a href="#" className="hover:text-violet-400 transition">Paket Standar</a></li>
              <li><a href="#" className="hover:text-violet-400 transition">Paket Absensi</a></li>
              <li><a href="#" className="hover:text-violet-400 transition">Add-on RFID</a></li>
              <li><a href="#" className="hover:text-violet-400 transition">Konsultasi Gratis</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-8 text-xl border-b-2 border-violet-600 w-fit pb-1">Legal</h3>
            <ul className="space-y-4 text-lg font-semibold">
              <li><a href="#" className="hover:text-violet-400 transition">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-violet-400 transition">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-violet-400 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-violet-400 transition">Support</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800/50 pt-8 flex flex-col items-center gap-2">
          <p className="text-base font-medium text-slate-400">
            © 2026 <span className="text-white font-bold">SAP</span>. All Rights Reserved.
          </p>
          <p className="text-sm font-bold tracking-widest text-slate-500 uppercase">
            Developed by tim <span className="text-slate-300">Frontend</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;