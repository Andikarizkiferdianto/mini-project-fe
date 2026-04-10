import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Contactform() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    sekolah: '',
    jabatan: 'Kepala Sekolah',
    alamat: '',
    telepon: '',
    paket: '',
    pesan: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isFormValid = 
    formData.nama.trim() !== "" && 
    formData.email.trim() !== "" && 
    formData.sekolah.trim() !== "" && 
    formData.telepon.trim() !== "" &&
    formData.paket !== "" &&
    formData.alamat.trim() !== "";

  const handleSubmit = (e) => {
  e.preventDefault();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    background: '#ffffff',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  Toast.fire({
    icon: 'success',
    title: '<span style="font-weight:700; color:#1e293b;">Terima kasih!</span>',
    html: '<span style="font-size: 14px; color:#64748b;">Data Anda berhasil dikirim. Tim kami akan menghubungi dalam 1x24 jam.</span>',
    iconColor: '#7c3aed',
    showClass: {
      popup: 'animate__animated animate__fadeInRight animate__faster'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutRight animate__faster'
    },
    customClass: {
      popup: 'rounded-2xl shadow-[0_20px_50px_rgba(124,58,237,0.15)] border-l-4 border-violet-600',
    }
  });

  setFormData({
    nama: '', email: '', sekolah: '', jabatan: 'Kepala Sekolah',
    alamat: '', telepon: '', paket: '', pesan: ''
  });
};

  return (
    <div className="p-8 md:p-12 bg-white h-full">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
            <input 
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              type="text" 
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition" 
              placeholder="Silakan mengisi nama" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
            <input 
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" 
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition" 
              placeholder="Silakan mengisi email" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nama Sekolah / Instansi</label>
            <input 
              name="sekolah"
              value={formData.sekolah}
              onChange={handleChange}
              type="text" 
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition" 
              placeholder="Silakan mengisi nama sekolah" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Jabatan</label>
            <select 
              name="jabatan"
              value={formData.jabatan}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition bg-white text-slate-600"
            >
              <option>Kepala Sekolah</option>
              <option>Admin IT / Operator</option>
              <option>Guru</option>
              <option>Lainnya</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Sekolah</label>
          <textarea 
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition h-28" 
            placeholder="Silakan mengisi alamat sekolah.."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nomor Telepon/WhatsApp</label>
            <input 
              name="telepon"
              value={formData.telepon}
              onChange={handleChange}
              type="text" 
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition" 
              placeholder="Silakan mengisi nomer telepon" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Paket yang Diminati</label>
            <select 
              name="paket"
              value={formData.paket}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition bg-white text-slate-600"
            >
              <option value="" disabled>Pilih Paket</option>
              <option value="Paket Dasar">Paket Dasar</option>
              <option value="Paket Menengah">Paket Menengah</option>
              <option value="Paket Lengkap">Paket Lengkap</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Pesan</label>
          <textarea 
            name="pesan"
            value={formData.pesan}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition h-28" 
            placeholder="Ada yang ingin ditanyakan?"
          ></textarea>
        </div>

        {/* 4. Implementasi Tombol Disabled */}
        <button 
          type="submit" 
          disabled={!isFormValid} // Tombol mati jika form belum valid
          className={`w-full font-bold py-4 rounded-xl transition duration-300 shadow-lg transform 
            ${isFormValid 
              ? "bg-violet-600 hover:bg-violet-700 text-white shadow-violet-200 hover:-translate-y-1 cursor-pointer" 
              : "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
            }`}
        >
          Ajukan Demo Sekarang
        </button>
      </form>
    </div>
  );
}

export default Contactform;