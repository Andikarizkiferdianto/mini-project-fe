import React from 'react';
import Sidebar from '../../../components/Sidebar';

const SettingDenda = () => {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6 bg-gray-50 min-h-screen mt-16 flex justify-center items-start">
                 <div className="w-full max-w-2xl bg-white rounded-lg shadow-md border border-gray-100 p-8 mt-10">
                    
                     <h1 className="text-lg font-bold text-slate-800 mb-6">
                        Setting Tarif Denda Per Hari
                    </h1>

                    {/* Form Input */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-md font-bold text-slate-800 mb-2">
                                Tarif Denda Per Hari (Rp)
                            </label>
                            <input 
                                type="text" 
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 text-lg"
                                defaultValue="1000"
                            />
                            <p className="text-gray-500 text-sm mt-2">
                                Masukkan nilai dalam Rupiah, contoh: 1000
                            </p>
                        </div>

                         <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition-colors text-xl">
                            Simpan
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SettingDenda;