import LogoHero from '../assets/LogoHero.png'

function Hero() {
  return (
    <section id="top" className="flex flex-col-reverse items-center justify-between px-8 pb-30 md:flex-row bg-violet-50 min-h-screen">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          .animate-float-slow {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>
      <div className="w-full md:w-1/2">
        <h1 className="mb-4 text-4xl font-extrabold leading-tight text-violet-900 md:text-5xl lg:text-6xl">
          Solusi Cerdas Kelola Akademik dengan SAP
        </h1>

        <p className="mb-8 text-lg text-slate-600 md:text-xl">
          Sistem Akademik Pintar (SAP) bikin semua urusan administrasi sekolah jadi lebih cepat, rapi, dan terintegrasi.
        </p>

        <div className="flex gap-4">
          <button className="font-bold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-md bg-violet-600 px-8 py-4 text-white hover:bg-violet-700">
            Lihat Paket
          </button>

          <button className="font-bold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-md border border-violet-600 px-8 py-4 text-violet-600 hover:bg-violet-600 hover:text-white">
            Konsultasi Gratis
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mt-12 text-center md:text-left">
          <div>
            <h2 className="text-4xl font-bold text-violet-600">969</h2>
            <p className="text-gray-500 font-medium">Citer</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-violet-600">120</h2>
            <p className="text-gray-500 font-medium">Sekolah</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-violet-600">10+</h2>
            <p className="text-gray-500 font-medium">Tahun</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-12 md:mb-0">
        <img 
            src={LogoHero} 
            alt="Hero Sistem Akademik Pintar" 
            className="w-full max-w-lg lg:max-w-2xl animate-float-slow drop-shadow-2xl rounded-3xl" 
        />
      </div>

    </section>
  );
}

export default Hero;