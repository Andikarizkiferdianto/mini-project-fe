import testt from "../assets/testt.jpg";

function Hero() {
  return (
    <section id="top" className="flex flex-col-reverse items-center justify-between px-8 py-16 md:flex-row bg-violet-50 min-h-screen">
      <div className="w-full md:w-1/2">
        <h1 className="mb-4 text-4xl font-extrabold leading-tight text-violet-900 md:text-5xl">
          Solusi Cerdas Kelola Akademik dengan SAP
        </h1>

        <p className="mb-8 text-lg text-slate-600">
          Sistem Akademik Pintar (SAP) bikin semua urusan administrasi sekolah jadi lebih cepat, rapi, dan terintegrasi.
        </p>

        <div className="flex gap-4">
          <button className="font-bold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-md bg-violet-600 px-10 py-4 font-semibold text-white hover:bg-violet-700 transition">
            Lihat Paket
          </button>

          <button className="font-bold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-md border border-violet-600 px-10 py-4 font-semibold text-violet-600 hover:bg-violet-600 hover:text-white transition">
            Konsultasi Gratis
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mt-10 text-center">
          <div>
            <h2 className="text-3xl font-bold text-indigo-600">969</h2>
            <p className="text-gray-500">Citer</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-indigo-600">120</h2>
            <p className="text-gray-500">Sekolah</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-indigo-600">10+</h2>
            <p className="text-gray-500">Tahun</p>
          </div>
        </div>
      </div>

       
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img src={testt} alt="hero" className="rounded-xl w-full max-w-md shadow-lg" />
      </div>

    </section>
  );
}

export default Hero;