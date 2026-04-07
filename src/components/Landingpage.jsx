function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 1. NAVBAR - Jatah Sakti */}
      <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-sm">
        <div className="text-2xl font-bold text-violet-700">SAP</div>
        <div className="hidden space-x-6 md:flex">
          <a href="#" className="hover:text-violet-600">Beranda</a>
          <a href="#" className="hover:text-violet-600">Tentang</a>
          <a href="#" className="hover:text-violet-600">Modul</a>
          <a href="#" className="hover:text-violet-600">Harga</a>
        </div>
        <button className="rounded-md bg-violet-600 px-4 py-2 text-white hover:bg-violet-700">
          Ajukan Demo
        </button>
      </nav>

      {/* 2. HERO SECTION - Jatah Sakti */}
      <section className="flex flex-col-reverse items-center justify-between px-8 py-16 md:flex-row bg-violet-50">
        <div className="w-full md:w-1/2">
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-violet-900 md:text-5xl">
            Solusi Cerdas Kelola Akademik dengan SAP
          </h1>
          <p className="mb-8 text-lg text-slate-600">
            Sistem Akademik Pintar (SAP) bikin semua urusan administrasi sekolah jadi lebih cepat, rapi, dan terintegrasi.
          </p>
          <div className="space-x-4">
             <button className="rounded-md bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700">Lihat Paket</button>
             <button className="rounded-md border border-violet-600 px-6 py-3 font-semibold text-violet-600 hover:bg-violet-50">Konsultasi Gratis</button>
          </div>
        </div>
        {/* Tempat gambar Jatah Sakti (Golet asset dewe sing apik) */}
        <div className="mb-8 w-full md:mb-0 md:w-1/2 flex justify-center">
            <div className="h-64 w-full max-w-md rounded-xl bg-slate-200 flex items-center justify-center text-slate-400">
                [Gambar Laptop Mockup Disini]
            </div>
        </div>
      </section>

      {/* 3. MODUL SECTION - Jatah Fadhil */}
      <section className="px-8 py-16 text-center">
        <h2 className="mb-2 text-sm font-bold uppercase text-violet-600">Fitur Utama</h2>
        <h3 className="mb-10 text-3xl font-bold text-slate-800">3 Modul Inti SAP</h3>
        
        {/* Grid buat 3 modul bae, de teruske Fadhil */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
           {/* Modul 1 */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold">S</div>
            <h4 className="font-bold text-slate-800">Manajemen Siswa</h4>
            <p className="text-sm text-slate-500 mt-2">Kelola data induk dan akademik siswa dengan mudah.</p>
          </div>
          {/* Fadhil lanjutke Modul Keuangan karo Modul Kelas nang ngene */}
        </div>
      </section>

      {/* 4. FOOTER (Kosongan sek) */}
      <footer className="bg-slate-900 px-8 py-8 text-center text-white">
        <p>© 2026 SAP (Sistem Akademik Pintar). Developed by Tim Frontend.</p>
      </footer>

    </div>
  )
}

export default LandingPage