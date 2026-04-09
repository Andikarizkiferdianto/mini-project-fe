function Pricing() {
    return (
        <div>
            <section id="harga" className="px-8 py-20 bg-slate-50">
                <div className="max-w-6xl mx-auto text-center">

                    <div className="mb-4">
                        <span className="text-xs font-semibold tracking-wider uppercase text-violet-600 bg-violet-100 px-4 py-2 rounded-full">
                            Paket Harga
                        </span>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-bold text-violet-500 text-slate-800 mb-5">
                        Investasi Terjangkau untuk Sekolah
                    </h3>

                    <p className="max-w-2xl mx-auto text-slate-600 mb-12">
                        Installasi Rp 1.000.000 + Maintenance Rp 300.000/bulan
                    </p>

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        {/* CARD 1 */}
                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-103 bg-white p-10 h-120 w-90 rounded-xl shadow-sm flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-2xl">Paket Menengah</h4>
                                <p className="text-4xl mt-4 font-bold my-4">Rp 1.000.000</p>

                                <ul className="text-left mt-15 text-slate-500 space-y-2 mb-6">
                                    <li>✔ Integrasi sistem absensi digital</li>
                                    <li>✔ Laporan kehadiran real-time</li>
                                    <li>✔ Notifikasi otomatis ke orang tua</li>
                                    <li>✔ Dashboard monitoring siswa</li>
                                </ul>
                            </div>
                            <button className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 px-4 py-2 bg-violet-600 text-white rounded-lg">
                                Info Lengkap
                            </button>
                        </div>

                        {/* CARD 2 (Highlight) */}
                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-103 p-10 h-150 w-95 rounded-xl shadow-lg text-white bg-gradient-to-br from-violet-600 to-indigo-500 flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-2xl">Paket Lengkap</h4>
                                <h1 className="text-5xl mt-4 font-bold my-4">Rp 1.000.000</h1>
                                <p className="mb-4 mt-7 text-sm opacity-90">
                                    Solusi lengkap untuk manajemen sekolah modern
                                </p>
                                <p className="mt-4 text-sm font-semibold bg-violet-400/30 text-white px-4 py-2 rounded-xl inline-block">
                                    Maintenance Rp 300.000/bulan
                                </p>
                                <ul className=" text-left mt-8 space-y-2 mb-6">
                                    <li>✔ Semua modul utama (Siswa, Guru, Akademik)</li>
                                    <li>✔ Domain website sekolah</li>
                                    <li>✔ Sistem pembayaran (Payment Gateway)</li>
                                    <li>✔ Maintenance & support</li>
                                    <li>✔ Update fitur berkala</li>
                                </ul>
                            </div>
                            <button className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 px-4 py-2 bg-white text-violet-600 rounded-lg font-semibold">
                                Pilih Paket Ini
                            </button>
                        </div>

                        {/* CARD 3 */}
                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-103 bg-white p-10 h-120 w-90 rounded-xl shadow-sm flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-2xl">Paket Dasar</h4>
                                <p className="text-4xl font-bold mt-4 my-4">Rp 20.000</p>

                                <ul className="text-left mt-15 text-slate-500 space-y-2 mb-6">
                                    <li>✔ Kartu RFID untuk siswa</li>
                                    <li>✔ Integrasi dengan sistem absensi</li>
                                    <li>✔ Proses tap cepat & akurat</li>
                                    <li>✔ Cocok untuk sekolah skala besar</li>
                                </ul>
                            </div>

                            <button className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 px-4 py-2 bg-violet-600 text-white rounded-lg">
                                Pesan Add-on
                            </button>
                        </div>
                    </div>


                </div>
            </section>
        </div>
    )
}
export default Pricing; 