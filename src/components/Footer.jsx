import React from 'react';
import LogoSap from '../assets/LogoSap.png'

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-2xl font-bold text-violet-700">
        <img src={LogoSap} alt="logo" className="h-10 w-auto" />
      </div>
              <span className="text-3xl font-black text-white tracking-tighter uppercase">
                SAP<span className="text-violet-500">.</span>
              </span>
            </div>
            <p className="text-lg leading-relaxed font-medium text-slate-400">
              Sistem Akademik Pintar terintegrasi untuk transformasi digital pendidikan Indonesia.
            </p>
            
            <div className="flex items-center gap-4 mt-6">
              <div className="group cursor-default">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center transition-all duration-300 group-hover:bg-violet-600 group-hover:-translate-y-1 pointer-events-none">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z"/>
                    </svg>
                    </div>
                    </div>

  <div className="group cursor-default">
    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center transition-all duration-300 group-hover:bg-violet-600 group-hover:-translate-y-1 pointer-events-none">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    </div>
  </div>

  <div className="group cursor-default">
    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center transition-all duration-300 group-hover:bg-violet-600 group-hover:-translate-y-1 pointer-events-none">
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"></path>
        <polygon fill="white" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    </div>
  </div>

  <div className="group cursor-default">
    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center transition-all duration-300 group-hover:bg-violet-600 group-hover:-translate-y-1 pointer-events-none">
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    </div>
  </div>
</div>
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
            Developed by tim <span className="text-slate-300">FRONTEND</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;