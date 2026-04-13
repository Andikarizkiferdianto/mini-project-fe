       import React from 'react';

function Calltoaction() {
  return (
    <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-8 md:p-12 text-white flex flex-col justify-center h-full">
      <h3 className="text-2xl font-bold mb-10">Informasi Kontak</h3>
      
      <div className="space-y-8">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <div>
            <p className="text-xs text-violet-200 uppercase font-bold tracking-widest mb-1">Email</p>
            <p className="font-semibold">SaktiGaming.com</p>
            <p className="font-semibold">FadhilGaming.com</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          </div>
          <div>
            <p className="text-xs text-violet-200 uppercase font-bold tracking-widest mb-1">Telepon/WhatsApp</p>
            <p className="font-semibold">0856-8969-7795</p>
            <p className="font-semibold">0899-8314-7877</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <div>
            <p className="text-xs text-violet-200 uppercase font-bold tracking-widest mb-1">Alamat</p>
            <p className="font-semibold text-sm leading-relaxed">Jl. Kemantren Raya No.5, RT.02/RW.04, Wonosari, Kec. Ngaliyan, Kota Semarang, Jawa Tengah 50186</p>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 mt-10">
          <p className="text-sm text-violet-100 flex items-center gap-2">
             <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
             Tim kami online untuk Anda
          </p>
        </div>
      </div>
    </div>
  );
}

export default Calltoaction;