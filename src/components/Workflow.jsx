function Workflow() {
  const steps = [
    {
      title: "Konsultasi & Analisis",
      desc: "Diskusikan kebutuhan sekolah Anda bersama tim kami untuk solusi terbaik.",
    },
    {
      title: "Implementasi Sistem",
      desc: "Kami bantu setup dan integrasi sistem dengan cepat dan efisien.",
    },
    {
      title: "Training Tim",
      desc: "Tim Anda akan dilatih agar bisa menggunakan sistem dengan optimal.",
    },
    {
      title: "Support & Maintenance",
      desc: "Kami selalu siap membantu setelah sistem berjalan.",
    },
  ];

  return (
    <section id="kerjasama" className="py-20 bg-violet-50">
      
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-violet-900">
          Alur Kerjasama SAP
        </h2>
        <p className="text-lg text-slate-600 mt-4">
          Proses mudah dan transparan untuk mulai digitalisasi
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        
        <div className="absolute left-6 top-0 w-[3px] h-full bg-violet-300"></div>

        {steps.map((step, index) => (
          <div key={index} className="flex items-start mb-14 relative">
            
            <div className="z-10 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-lg font-bold shadow-xl">
              {index + 1}
            </div>

            <div className="ml-8 bg-white p-8 rounded-2xl shadow-lg w-full hover:-translate-y-2 transition duration-300">
              <h3 className="text-xl font-bold text-violet-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.desc}
              </p>
            </div>

          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-violet-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-violet-700 transition hover:scale-105 shadow-md">
          Ajukan Kerjasama
        </button>
      </div>
    </section>
  );
}

export default Workflow;