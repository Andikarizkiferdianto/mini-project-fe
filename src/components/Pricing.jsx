function Pricing() {
    return (
        <div>
            <section id="harga" className="px-8 py-20 bg-slate-50">
                <div className="max-w-6xl mx-auto text-center">

                    <h2 className="text-sm font-bold text-violet-600 uppercase mb-2">
                        Paket Harga
                    </h2>

                    <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12">
                        Investasi Terjangkau untuk Sekolah
                    </h3>

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                        {/* CARD 1 */}


                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-103 bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-lg">Paket Absensi</h4>
                            <p className="text-2xl font-bold my-4">Rp 1.000.000</p>
                            <ul className="text-sm text-left text-slate-500 space-y-2 mb-6">
                                <li>✔ Integrasi sistem</li>
                                <li>✔ Laporan real-time</li>
                                <li>✔ Notifikasi</li>
                            </ul>
                            <button className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 px-4 py-2 bg-violet-600 text-white rounded-lg">
                                Info Lengkap
                            </button>
                        </div>

                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-103 p-8 rounded-xl shadow-lg text-white bg-gradient-to-br from-violet-600 to-indigo-500">
                            <h4 className="font-bold text-lg">Paket Standar</h4>
                            <h1 className="text-3xl font-bold my-4">Rp 1.000.000</h1>
                            <p className="mb-3">s</p>

                            <ul className="text-sm text-left space-y-2 mb-6">
                                <li>✔ Semua modul utama</li>
                                <li>✔ Domain sekolah</li>
                                <li>✔ Payment gateway</li>
                                <li>✔ Maintenance</li>
                            </ul>

                            <button className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 px-4 py-2 bg-white text-violet-600 rounded-lg font-semibold">
                                Pilih Paket Ini
                            </button>
                        </div>


                        <div className="transition duration-200 ease-out hover:-translate-y-1 hover:scale-103 bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-lg">Add-on RFID</h4>
                            <p className="text-2xl font-bold my-4">Rp 20.000</p>

                            <ul className="text-sm text-left text-slate-500 space-y-2 mb-13">
                                <li>✔ Kartu RFID</li>
                                <li>✔ Integrasi absensi</li>
                            </ul>

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