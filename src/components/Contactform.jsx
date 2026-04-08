import React from 'react';

function Contactform() {
  return (
    <div className="p-8 md:p-12 bg-white h-full">
      <form className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
            <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition" placeholder="Silakan mengisi nama" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition" placeholder="Silakan mengisi email" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nama Sekolah / Instansi</label>
            <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition" placeholder="Silakan mengisi nama sekolah" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Jabatan</label>
            <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition bg-white text-slate-600">
              <option>Kepala Sekolah</option>
              <option>Admin IT / Operator</option>
              <option>Guru</option>
              <option>Lainnya</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Sekolah</label>
          <textarea className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition h-28" placeholder="Silakan mengisi alamat sekolah.."></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nomor Telepon/WhatsApp</label>
            <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition" placeholder="Silakan mengisi nomer telepon" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Paket yang Diminati</label>
            <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition bg-white text-slate-600">
              <option disabled selected>Pilih Paket</option>
              <option>Paket Dasar</option>
              <option>Paket Menengah</option>
              <option>Paket Lengkap</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Pesan</label>
          <textarea className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition h-28" placeholder="Ada yang ingin ditanyakan?"></textarea>
        </div>

        <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl transition duration-300 shadow-lg shadow-violet-200 transform hover:-translate-y-1">
          Ajukan Demo Sekarang
        </button>
      </form>
    </div>
  );
}

export default Contactform;