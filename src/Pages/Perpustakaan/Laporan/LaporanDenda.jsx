import React from 'react';
import Sidebar from '../../../components/Sidebar';
import { Wallet } from 'lucide-react';

const LaporanDenda = () => {
    return (
        <div className="flex">
            <Sidebar />
            
            <div className="flex-1 p-6 bg-gray-50 min-h-screen mt-16">
                 <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    
                     <div className="bg-red-600 p-4">
                        <div className="flex items-center gap-2 text-white">
                            <Wallet size={24} />
                            <h1 className="text-xl font-medium">
                                Laporan Denda Peminjaman Buku
                            </h1>
                        </div>
                        <p className="text-white text-sm mt-1 font-semibold ml-8">
                            Tarif denda per hari: Rp 1.000
                        </p>
                    </div>

                     <div className="p-4">
                         <div className="w-full bg-cyan-100 border border-cyan-200 rounded-md p-4">
                            <p className="text-cyan-900">
                                Tidak ada denda yang tercatat.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LaporanDenda;