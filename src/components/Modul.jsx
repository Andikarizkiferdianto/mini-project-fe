import {
    Users, GraduationCap, Wallet, BookOpen,
    Layout, FileText, School, Contact2
} from 'lucide-react';

function Modul() {
    // Kumpulan data modul. Kalau mau ganti icon atau teks, tinggal ubah di sini bos!
    const modulData = [
        {
            icon: <Users size={40} />,
            title: "Manajemen Siswa",
            desc: "Pantau profil lengkap, riwayat nilai, hingga rekam jejak prestasi peserta didik secara terpusat."
        },
        {
            icon: <GraduationCap size={40} />,
            title: "Manajemen Guru",
            desc: "Kelola penugasan, absensi kehadiran, dan pencatatan kinerja tenaga pendidik dengan rapi."
        },
        {
            icon: <Wallet size={40} />,
            title: "Manajemen Keuangan",
            desc: "Otomatisasi pencatatan SPP, tagihan, dan laporan arus kas sekolah yang transparan & akurat."
        },
        {
            icon: <BookOpen size={40} />,
            title: "Perpustakaan Digital",
            desc: "Sistem sirkulasi cerdas untuk pencatatan peminjaman buku dan akses e-katalog secara online."
        },
        {
            icon: <Layout size={40} />,
            title: "Manajemen Aplikasi",
            desc: "Pusat kendali untuk mengatur hak akses user, konfigurasi sistem, dan integrasi dengan layanan eksternal."
        },
        {
            icon: <FileText size={40} />,
            title: "PPDB Online",
            desc: "Digitalisasi penuh proses pendaftaran siswa baru, dari pengisian formulir hingga pengumuman kelulusan."
        },
        {
            icon: <School size={40} />,
            title: "Manajemen Sekolah",
            desc: "Inventarisasi aset, pencatatan sarana prasarana, hingga pengelolaan agenda operasional institusi."
        },
        {
            icon: <Contact2 size={40} />,
            title: "Kepegawaian",
            desc: "Pengelolaan data pegawai, jabatan, dan administrasi kepegawaian secara terstruktur."
        }
    ];

    return (
        <div>
            <section id="modul" className="py-24 bg-gray-50 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-[1400px] mx-auto px-8 text-center">

                    <div className="mb-6">
                        <span className="text-sm font-semibold tracking-wider uppercase text-violet-600 bg-violet-100 px-5 py-2.5 rounded-full">
                            Fitur Unggulan
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-violet-600 mt-2 mb-4">
                        8 Modul Utama SAP
                    </h2>

                    <p className="text-gray-500 mb-16 text-lg">
                        Semua yang Anda butuhkan dalam satu platform terintegrasi
                    </p>

                    {/* Grid-nya gw set jadi 4 kolom di monitor gede (lg:grid-cols-4) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {/* Looping datanya di sini, kodingan jadi super ringkas! */}
                        {modulData.map((item, index) => (
                            <div key={index} className="transition duration-300 ease-out hover:-translate-y-2 hover:scale-105 rounded-2xl border border-slate-200 hover:border-violet-400 bg-white p-8 shadow-sm hover:shadow-xl cursor-pointer flex flex-col items-center">
                                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-violet-500 text-white mb-6 shadow-md">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-xl text-gray-800 mb-3 text-center">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed text-center">
                                    {item.desc}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </div>
    );
}

export default Modul;