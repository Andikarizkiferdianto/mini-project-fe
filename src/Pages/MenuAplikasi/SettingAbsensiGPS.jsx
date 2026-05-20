import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import {
    RiMapPin2Fill,
    RiAddLine,
    RiDeleteBin6Fill,
} from "react-icons/ri";

const SettingAbsensiGPS = () => {

    const [lokasi, setLokasi] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        nama_lokasi: "",
        latitude: "",
        longitude: "",
        radius: "",
        jam_masuk: "",
        jam_selesai: "",
    });

    const fetchLokasi = async () => {

        try {

            setLoading(true);

            const res = await axios.get(
                "http://localhost:8000/api/absensi-gps"
            );

            setLokasi(res.data.data || []);

        } catch (err) {

            console.log(err);

            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Gagal mengambil data lokasi"
            });

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLokasi();
    }, []);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const tambahLokasi = async () => {

        if (
            !form.nama_lokasi ||
            !form.latitude ||
            !form.longitude ||
            !form.radius ||
            !form.jam_masuk ||
            !form.jam_selesai
        ) {

            Swal.fire({
                icon: "warning",
                title: "Oops",
                text: "Semua field wajib diisi"
            });

            return;
        }

        try {

            await axios.post(
                "http://localhost:8000/api/absensi-gps",
                form
            );

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Lokasi berhasil ditambahkan"
            });

            setForm({
                nama_lokasi: "",
                latitude: "",
                longitude: "",
                radius: "",
                jam_masuk: "",
                jam_selesai: "",
            });

            setShowModal(false);

            fetchLokasi();

        } catch (err) {

            console.log(err);

            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Gagal menambahkan lokasi"
            });
        }
    };

    const hapusLokasi = async (id) => {

        const confirm = await Swal.fire({
            title: "Hapus Data?",
            text: "Data lokasi akan dihapus",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya Hapus",
            cancelButtonText: "Batal"
        });

        if (!confirm.isConfirmed) return;

        try {

            await axios.delete(
                `http://localhost:8000/api/absensi-gps?id=${id}`
            );

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Lokasi berhasil dihapus"
            });

            fetchLokasi();

        } catch (err) {

            console.log(err);

            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Gagal menghapus lokasi"
            });
        }
    };

    const LocationPicker = ({ setForm }) => {

        useMapEvents({
            click(e) {

                setForm((prev) => ({
                    ...prev,
                    latitude: e.latlng.lat.toString(),
                    longitude: e.latlng.lng.toString(),
                }));
            },
        });

        return null;
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 p-4 mt-16 overflow-x-auto">

                <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">

                    <div className="bg-violet-600 text-white px-4 py-3 flex items-center justify-between">

                        <div className="flex items-center gap-2 text-3xl">

                            <RiMapPin2Fill className="text-orange-400" />

                            <h1 className="text-2xl font-medium">
                                Lokasi Absensi
                            </h1>

                        </div>

                        <button
                            onClick={() => setShowModal(true)}
                            className="text-white px-4 py-2 rounded flex items-center gap-2 bg-green-500 hover:bg-green-600"
                        >
                            <RiAddLine />
                            Tambah Lokasi
                        </button>

                    </div>

                    <div className="p-4 overflow-x-auto">

                        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">

                            <thead className="bg-violet-600 text-white text-center">

                                <tr>

                                    <th className="border border-gray-300 px-4 py-3">No</th>
                                    <th className="border border-gray-300 px-4 py-3">Nama Lokasi</th>
                                    <th className="border border-gray-300 px-4 py-3">Latitude</th>
                                    <th className="border border-gray-300 px-4 py-3">Longitude</th>
                                    <th className="border border-gray-300 px-4 py-3">Radius</th>
                                    <th className="border border-gray-300 px-4 py-3">Jam Masuk</th>
                                    <th className="border border-gray-300 px-4 py-3">Jam Selesai</th>
                                    <th className="border border-gray-300 px-4 py-3">Aksi</th>

                                </tr>

                            </thead>

                            <tbody>

                                {loading ? (

                                    <tr>
                                        <td colSpan="8" className="text-center py-6">
                                            Loading...
                                        </td>
                                    </tr>

                                ) : lokasi.length === 0 ? (

                                    <tr>
                                        <td colSpan="8" className="text-center py-6">
                                            Tidak ada data
                                        </td>
                                    </tr>

                                ) : (

                                    lokasi.map((item, index) => (

                                        <tr
                                            key={item.id}
                                            className="text-center hover:bg-gray-50"
                                        >

                                            <td className="border border-gray-300 px-4 py-3">
                                                {index + 1}
                                            </td>

                                            <td className="border border-gray-300 px-4 py-3">
                                                {item.nama_lokasi}
                                            </td>

                                            <td className="border border-gray-300 px-4 py-3">
                                                {item.latitude}
                                            </td>

                                            <td className="border border-gray-300 px-4 py-3">
                                                {item.longitude}
                                            </td>

                                            <td className="border border-gray-300 px-4 py-3">
                                                {item.radius} m
                                            </td>

                                            <td className="border border-gray-300 px-4 py-3">
                                                {item.jam_masuk}
                                            </td>

                                            <td className="border border-gray-300 px-4 py-3">
                                                {item.jam_selesai}
                                            </td>

                                            <td className="border border-gray-300 px-4 py-3">

                                                <button
                                                    onClick={() =>
                                                        hapusLokasi(item.id)
                                                    }
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                                                >
                                                    <RiDeleteBin6Fill />
                                                </button>

                                            </td>

                                        </tr>
                                    ))
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {showModal && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">

                        <div className="flex items-center justify-between mb-6">

                            <h2 className="text-2xl font-semibold">
                                Tambah Lokasi Absensi
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 text-2xl"
                            >
                                ×
                            </button>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="md:col-span-2">

                                <label className="block mb-1 font-medium">
                                    Nama Lokasi
                                </label>

                                <input
                                    type="text"
                                    name="nama_lokasi"
                                    value={form.nama_lokasi}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                />

                            </div>

                            <div>

                                <label className="block mb-1 font-medium">
                                    Latitude
                                </label>

                                <input
                                    type="text"
                                    name="latitude"
                                    value={form.latitude}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                />

                            </div>

                            <div>

                                <label className="block mb-1 font-medium">
                                    Longitude
                                </label>

                                <input
                                    type="text"
                                    name="longitude"
                                    value={form.longitude}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                />

                            </div>

                            <div>

                                <label className="block mb-1 font-medium">
                                    Radius
                                </label>

                                <input
                                    type="number"
                                    name="radius"
                                    value={form.radius}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                />

                            </div>

                            <div>

                                <label className="block mb-1 font-medium">
                                    Jam Masuk
                                </label>

                                <input
                                    type="time"
                                    name="jam_masuk"
                                    value={form.jam_masuk}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                />

                            </div>

                            <div>

                                <label className="block mb-1 font-medium">
                                    Jam Selesai
                                </label>

                                <input
                                    type="time"
                                    name="jam_selesai"
                                    value={form.jam_selesai}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                />

                            </div>

                            <div className="md:col-span-2 mt-4 rounded overflow-hidden">

                                <MapContainer
                                    center={[-6.200000, 106.816666]}
                                    zoom={13}
                                    style={{ height: "350px", width: "100%" }}
                                >

                                    <TileLayer
                                        attribution='&copy; OpenStreetMap contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    <LocationPicker setForm={setForm} />

                                    {form.latitude && form.longitude && (

                                        <Marker
                                            position={[
                                                parseFloat(form.latitude),
                                                parseFloat(form.longitude)
                                            ]}
                                        />

                                    )}

                                </MapContainer>

                            </div>

                        </div>

                        <div className="flex justify-end mt-6 gap-2">

                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Batal
                            </button>

                            <button
                                onClick={tambahLokasi}
                                className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
                            >
                                Simpan
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default SettingAbsensiGPS;