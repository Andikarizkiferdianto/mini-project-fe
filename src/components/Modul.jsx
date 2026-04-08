import 'remixicon/fonts/remixicon.css';


function Modul() {
    return (
        <div>
            <section id="modul" className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    
                    <h2 className="text-3xl font-bold text-violet-600 mt-2">
                        Fitur Lengkap
                    </h2>

                    {/* <!-- Grid --> */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                        {/* <!-- Card --> */}
                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-102 rounded-lg border border-slate-200 hover:border-violet-400 active:border-violet-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 bg-white p-6 shadow-sm hover:shadow-md cursor-pointer">
                            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 text-white mb-4">
                                <i className="ri-user-fill"></i>
                            </div>
                            <h3 className="font-semibold text-gray-800">
                                Manajemen Siswa
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Mengelola data siswa, nilai, absensi, dan perkembangan akademik secara menyeluruh.
                            </p>
                        </div>

                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-102 rounded-lg border border-slate-200 hover:border-violet-400 active:border-violet-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 bg-white p-6 shadow-sm hover:shadow-md cursor-pointer">
                            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 text-white mb-4">
                                <i className="ri-group-fill"></i>
                            </div>
                            <h3 className="font-semibold text-gray-800">
                                Manajemen Guru
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Mengatur jadwal mengajar, data guru, serta evaluasi dan penilaian kinerja pengajar.
                            </p>
                        </div>

                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-102 rounded-lg border border-slate-200 hover:border-violet-400 active:border-violet-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 bg-white p-6 shadow-sm hover:shadow-md cursor-pointer">
                            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 text-white mb-4">
                                <i className="ri-wallet-3-fill"></i>
                            </div>
                            <h3 className="font-semibold text-gray-800">
                                Manajemen Keuangan
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Memantau pembayaran SPP, anggaran, dan laporan keuangan lainnya.
                            </p>
                        </div>

                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-102 rounded-lg border border-slate-200 hover:border-violet-400 active:border-violet-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 bg-white p-6 shadow-sm hover:shadow-md cursor-pointer">
                            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 text-white mb-4">
                                <i className="ri-book-open-fill"></i>
                            </div>
                            <h3 className="font-semibold text-gray-800">
                                Perpustakaan Digital
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Mengelola katalog buku, peminjaman, dan pengembalian secara online.
                            </p>
                        </div>

                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-102 rounded-lg border border-slate-200 hover:border-violet-400 active:border-violet-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 bg-white p-6 shadow-sm hover:shadow-md cursor-pointer">
                            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 text-white mb-4">
                                <i className="ri-computer-fill"></i>
                            </div>
                            <h3 className="font-semibold text-gray-800">
                                Manajemen Aplikasi
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Integrasi dan pengelolaan berbagai aplikasi pembelajaran digital.
                            </p>
                        </div>

                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-102 rounded-lg border border-slate-200 hover:border-violet-400 active:border-violet-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 bg-white p-6 shadow-sm hover:shadow-md cursor-pointer">
                            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 text-white mb-4">
                                <i className="ri-school-fill"></i>
                            </div>
                            <h3 className="font-semibold text-gray-800">
                                Manajemen Akademik
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Administrasi akademik, inventaris, fasilitas, dan manajemen sekolah secara menyeluruh.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
export default Modul