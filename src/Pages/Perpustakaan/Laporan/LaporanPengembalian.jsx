import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import { BookOpen, CornerDownLeft, CornerDownLeftIcon } from 'lucide-react';

const LaporanPengembalian = () => {
    const [loanData, setLoanData] = useState([]);

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6 bg-gray-50 min-h-screen mt-16">
                 <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">

                    <div className="bg-green-700 p-3">
                        <h1 className="text-xl font-medium text-white flex items-center gap-2">
                            <CornerDownLeft size={24} className="text-white" />
                            <span>Laporan Pengembalian Buku</span>
                        </h1>
                    </div>

                    <div className="p-4">
                        <div className="w-full bg-cyan-100 border border-cyan-200 rounded-md p-4">
                            <p className="text-cyan-900">
                                Belum ada data pengembalian.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LaporanPengembalian;