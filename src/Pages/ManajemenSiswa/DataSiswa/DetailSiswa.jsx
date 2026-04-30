import React from "react";

const DetailSiswa = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;

    const Item = ({ label, value }) => (
        <div className="grid grid-cols-[200px_10px_1fr] mb-1">
            <span className="font-semibold">{label}</span>
            <span>:</span>
            <span>{value || "-"}</span>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[950px] rounded-lg shadow-lg overflow-hidden">

                 <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
                    <h2 className="font-semibold flex items-center gap-2">
                        <i className="ri-file-user-line"></i>
                        Detail Lengkap Siswa
                    </h2>
                    <button onClick={onClose}>✕</button>
                </div>

                 <div className="p-5 max-h-[75vh] overflow-y-auto">

                    <div className="flex gap-6">

                        {/* FOTO */}
                        <div className="text-center w-[180px]">
                            <h3 className="font-semibold">{data.nama}</h3>
                            <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                                {data.kelas || "-"}
                            </span>
                        </div>

                         <div className="flex-1">
                            <h3 className="text-blue-600 font-semibold border-b pb-1 mb-2">
                                Data Pribadi
                            </h3>

                            <Item label="NIS" value={data.nis} />
                            <Item label="NISN" value={data.nisn} />
                            <Item
                                label="Tempat, Tgl Lahir"
                                value={`${data.tempat_lahir || "-"}, ${data.tgl_lahir || "-"}`}
                            />                            <Item
                                label="Jenis Kelamin"
                                value={data.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
                            />
                            <Item label="Alamat" value={data.alamat} />
                            <Item label="Agama" value={data.agama} />
                            <Item label="Golongan Darah" value={data.golongan_darah} />
                            <Item label="Email / WA" value={data.email} />
                            <Item label="Kelas" value={data.kelas} />
                            <Item label="Jurusan" value={data.jurusan} />
                            <Item label="Tahun Ajaran" value={data.tahun_ajaran} />
                            <Item label="Tahun Masuk" value={data.tahun_masuk} />
                            <Item label="Sekolah Asal" value={data.sekolah_asal} />
                        </div>

                    </div>

                     <div className="flex justify-center mt-6 grid grid-cols-3 gap-6 text-sm">

                        <div>
                            <h3 className="text-blue-600 font-semibold border-b pb-1 mb-2">
                                Data Ayah
                            </h3>
                            <Item label="Nama" value={data.nama_ayah} />
                            <Item label="Pekerjaan" value={data.pekerjaan_ayah} />
                            <Item label="No HP" value={data.no_hp_ayah} />
                        </div>

                        <div>
                            <h3 className="text-blue-600 font-semibold border-b pb-1 mb-2">
                                Data Ibu
                            </h3>
                            <Item label="Nama" value={data.nama_ibu} />
                            <Item label="Pekerjaan" value={data.pekerjaan_ibu} />
                            <Item label="No HP" value={data.no_hp_ibu} />
                        </div>

                    </div>

                </div>

                 <div className="flex justify-end gap-2 p-4 border-t">
                    <button className="bg-gray-500 text-white px-3 py-1 rounded">
                        Cetak
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Tutup
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DetailSiswa;