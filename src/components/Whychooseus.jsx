import 'remixicon/fonts/remixicon.css';

function Whychooseus() {
    return (
        
        <div>
            <section id="tentang" className="px-8 py-24 bg-white min-h-screen flex flex-col justify-center">                
                <div className="max-w-[1400px] w-full mx-auto text-center">
                    <div className="mb-6">
                        <span className="text-sm font-semibold tracking-wider uppercase text-violet-600 bg-violet-100 px-5 py-2.5 rounded-full">
                            Tentang Kami
                        </span>
                    </div>


                    <h3 className="mb-8 text-3xl md:text-5xl font-bold text-violet-600">
                        Sistem Akademik yang Modern & Terintegrasi
                    </h3>

                    <p className="max-w-3xl mx-auto text-slate-600 mb-16 text-lg md:text-xl leading-relaxed">
                        SAP (Sistem Akademik Pintar) membantu sekolah mengelola data siswa,
                        keuangan, hingga proses akademik secara efisien dalam satu platform.
                    </p>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

                        {/* Card 1 */}
                        <div className="transition duration-300 ease-out hover:-translate-y-2 hover:scale-105 rounded-2xl border border-slate-200 hover:border-violet-400 bg-white p-12 shadow-sm hover:shadow-xl cursor-pointer">
                            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-violet-100 flex items-center justify-center">
                                <i className="ri-money-dollar-circle-line text-4xl text-violet-600"></i>
                            </div>
                            <h4 className="font-bold text-2xl text-slate-800">
                                Biaya Terjangkau
                            </h4>
                            <p className="text-base text-slate-500 mt-4 leading-relaxed">
                                Nikmati sistem lengkap dengan harga yang ramah untuk sekolah tanpa mengurangi kualitas layanan.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="transition duration-300 ease-out hover:-translate-y-2 hover:scale-105 rounded-2xl border border-slate-200 hover:border-violet-400 bg-white p-12 shadow-sm hover:shadow-xl cursor-pointer">
                            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-violet-100 flex items-center justify-center">
                                <i className="ri-shield-check-line text-4xl text-violet-600"></i>
                            </div>
                            <h4 className="font-bold text-2xl text-slate-800">
                                Keamanan Data
                            </h4>
                            <p className="text-base text-slate-500 mt-4 leading-relaxed">
                                Data sekolah Anda aman dengan sistem keamanan modern.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="transition duration-300 ease-out hover:-translate-y-2 hover:scale-105 rounded-2xl border border-slate-200 hover:border-violet-400 bg-white p-12 shadow-sm hover:shadow-xl cursor-pointer">
                            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-violet-100 flex items-center justify-center">
                                <i className="ri-bar-chart-line text-4xl text-violet-600"></i>
                            </div>
                            <h4 className="font-bold text-2xl text-slate-800">
                                Manajemen Akademik
                            </h4>
                            <p className="text-base text-slate-500 mt-4 leading-relaxed">
                                Kelola jadwal, nilai, absensi, dan laporan akademik dalam satu sistem terintegrasi.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>

    );

}
export default Whychooseus;