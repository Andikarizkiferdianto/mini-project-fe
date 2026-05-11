import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import { BookOpen } from 'lucide-react';

const LaporanPeminjaman = () => {
     const [loanData, setLoanData] = useState([]);

    return (
        <div className="flex">
            <Sidebar />
            
            <div className="flex-1 p-6 bg-gray-50 min-h-screen mt-16">
                 <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    
                     <div className="bg-violet-500 p-3 flex items-center gap-2">
                        <BookOpen size={22} className="text-white" />
                        <h1 className="text-xl font-medium text-white">Laporan Peminjaman Buku</h1>
                    </div>

                     <div className="p-4">
                         <div className="w-full bg-cyan-100 border border-cyan-200 rounded-md p-4">
                            <p className="text-cyan-900">
                                Belum ada data peminjaman.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LaporanPeminjaman;