import 'remixicon/fonts/remixicon.css';



function Whychooseus() {
    return (

        <div>
            <section id="tentang" className="px-8 py-20 bg-white min-h-screen">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-4">
                        <span className="text-xs font-semibold tracking-wider uppercase text-violet-600 bg-violet-100 px-4 py-2 rounded-full">
                            Tentang Kami
                        </span>
                    </div>


                    <h3 className="mb-6 text-3xl md:text-4xl font-bold text-slate-800 text-violet-500">
                        Sistem Akademik yang Modern & Terintegrasi
                    </h3>

                    <p className="max-w-2xl mx-auto text-slate-600 mb-12">
                        SAP (Sistem Akademik Pintar) membantu sekolah mengelola data siswa,
                        keuangan, hingga proses akademik secara efisien dalam satu platform.
                    </p>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Card 1 */}
                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 rounded-lg border border-slate-200 hover:border-violet-400 bg-white p-10 shadow-sm hover:shadow-md cursor-pointer">
                            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center">
                                <i className="ri-money-dollar-circle-line text-2xl text-violet-600"></i>
                            </div>
                            <h4 className="font-bold text-xl">
                                Biaya Terjangkau
                            </h4>
                            <p className="text-sm text-slate-500 mt-2">
                                Nikmati sistem lengkap dengan harga yang ramah untuk sekolah tanpa mengurangi kualitas layanan.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 rounded-lg border border-slate-200 hover:border-violet-400 bg-white p-10 shadow-sm hover:shadow-md cursor-pointer">
                            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center">
                                <i className="ri-shield-check-line text-2xl text-violet-600"></i>
                            </div>
                            <h4 className="font-bold text-xl">
                                Keamanan Data
                            </h4>
                            <p className="text-sm text-slate-500 mt-2">
                                Data sekolah Anda aman dengan sistem keamanan modern.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 rounded-lg border border-slate-200 hover:border-violet-400 bg-white p-10 shadow-sm hover:shadow-md cursor-pointer">
                            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center">
                                <i className="ri-bar-chart-line text-2xl text-violet-600"></i>
                            </div>
                            <h4 className="font-bold text-xl">
                                Manajemen Akademik
                            </h4>
                            <p className="text-sm text-slate-500 mt-2">
                                Kelola jadwal, nilai, absensi, dan laporan akademik dalam satu sistem terintegrasi.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>

    )

}
export default Whychooseus