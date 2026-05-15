import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';

const BASE_URL = 'http://localhost:8000/api/dashboard-statistik';

const DashboardAplikasi = () => {

    const [stats, setStats] = useState({
        users: 0,
        banner: 0,
        info: 0,
        backup: 0
    });

    const [loading, setLoading] = useState(true);

    
    const fetchDashboard = async () => {

        try {

            const response = await fetch(BASE_URL);

            const result = await response.json();

            if (result.status === 'success') {

                setStats({
                    users: result.data.total_users,
                    banner: result.data.total_banner,
                    info: result.data.total_informasi,
                    backup: result.data.total_backup
                });
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (
        <div className="flex bg-gray-50 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8 mt-12">

                <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 tracking-wide">
                    Dashboard Statistik Aplikasi
                </h1>

                {loading ? (

                    <div className="text-center text-gray-500">
                        Loading...
                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* USERS */}
                        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg relative overflow-hidden h-48 flex flex-col justify-between hover:-translate-y-1 transition duration-300">

                            <h3 className="font-medium text-lg z-10 relative">
                                Total Users
                            </h3>

                            <p className="text-5xl font-bold z-10 relative">
                                {stats.users}
                            </p>

                            <i className="ri-group-fill absolute -bottom-6 -right-4 text-9xl text-white opacity-20 z-0"></i>

                        </div>

                        {/* BANNER */}
                        <div className="bg-emerald-500 text-white p-6 rounded-lg shadow-lg relative overflow-hidden h-48 flex flex-col justify-between hover:-translate-y-1 transition duration-300">

                            <h3 className="font-medium text-lg z-10 relative">
                                Total Banner Sekolah
                            </h3>

                            <p className="text-5xl font-bold z-10 relative">
                                {stats.banner}
                            </p>

                            <i className="ri-image-fill absolute -bottom-6 -right-4 text-9xl text-white opacity-20 z-0"></i>

                        </div>

                        {/* INFORMASI */}
                        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg relative overflow-hidden h-48 flex flex-col justify-between hover:-translate-y-1 transition duration-300">

                            <h3 className="font-medium text-lg z-10 relative">
                                Total Informasi Lembaga
                            </h3>

                            <p className="text-5xl font-bold z-10 relative">
                                {stats.info}
                            </p>

                            <i className="ri-information-fill absolute -bottom-6 -right-4 text-9xl text-white opacity-20 z-0"></i>

                        </div>

                        {/* BACKUP */}
                        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg relative overflow-hidden h-48 flex flex-col justify-between hover:-translate-y-1 transition duration-300">

                            <h3 className="font-medium text-lg z-10 relative">
                                Total Backup File
                            </h3>

                            <p className="text-5xl font-bold z-10 relative">
                                {stats.backup}
                            </p>

                            <i className="ri-file-download-fill absolute -bottom-6 -right-4 text-9xl text-white opacity-20 z-0"></i>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default DashboardAplikasi;