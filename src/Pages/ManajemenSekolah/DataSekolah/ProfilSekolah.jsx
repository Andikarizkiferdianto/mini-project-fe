import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import 'remixicon/fonts/remixicon.css';

const ProfilSekolah = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8 mt-12">
                 <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-6 mb-6">
                        <div className="flex items-center gap-5">
                             <div className="w-24 h-24 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
                                <i className="ri-image-line text-3xl text-gray-400"></i>
                                {/* Nanti kalau ada logo asli tinggal pakai tag <img src="..." /> */}
                            </div>
                            
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800">Sekolah Sampel Mobte</h1>
                                <p className="text-sm text-gray-500 font-medium">NPSN: 11111</p>
                            </div>
                        </div>

                        <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm transition-colors">
                            <i className="ri-edit-box-line"></i>
                            Edit Profil
                        </button>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                        
                        {/*   Alamat & Email */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <i className="ri-map-pin-2-fill text-red-500 text-xl"></i>
                                <div>
                                    <h3 className="font-bold text-slate-800">Alamat:</h3>
                                    <p className="text-gray-600">JL. PP</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <i className="ri-mail-fill text-yellow-500 text-xl"></i>
                                <div>
                                    <h3 className="font-bold text-slate-800">Email:</h3>
                                    <p className="text-gray-600">test@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        {/*   Telepon & Website */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <i className="ri-phone-fill text-teal-600 text-xl"></i>
                                <div>
                                    <h3 className="font-bold text-slate-800">Telepon:</h3>
                                    <p className="text-gray-600">082-969-1122</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <i className="ri-global-fill text-blue-400 text-xl"></i>
                                <div>
                                    <h3 className="font-bold text-slate-800">Website:</h3>
                                    <a href="http://localhost:5173/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                                        www.sap.id
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/*   Kepala Sekolah */}
                        <div className="md:col-span-2 flex items-start gap-3 border-t border-gray-100 pt-4">
                            <i className="ri-user-3-fill text-gray-500 text-xl"></i>
                            <div className="flex items-center gap-1">
                                <h3 className="font-bold text-slate-800">Kepala Sekolah:</h3>
                                <p className="text-gray-600">Test</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilSekolah;