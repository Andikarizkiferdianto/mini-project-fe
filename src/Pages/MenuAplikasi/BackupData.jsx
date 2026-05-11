import React from "react";
import Sidebar from "../../components/Sidebar";

const BackupData = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-4 mt-16">

                 <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6">

                     <h1 className="text-3xl font-normal text-gray-800 mb-8">
                        Backup Data Partial (Tabel Terpilih)
                    </h1>

                     <button
                        className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded text-lg"
                    >
                        Backup Sekarang
                    </button>

                     <hr className="my-10 border-gray-300" />

                    {/* FILE LIST */}
                    <div>

                        <h2 className="text-2xl text-gray-800 mb-4">
                            File Backup Tersedia
                        </h2>

                        <ul className="list-disc pl-8 space-y-2">

                            <li>
                                <a
                                    href="#"
                                    className="text-blue-600 hover:underline text-lg"
                                >
                                    backup_partial__20250710_193216.sql
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="text-blue-600 hover:underline text-lg"
                                >
                                    backup_partial__20250710_193043.sql
                                </a>
                            </li>

                        </ul>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default BackupData;

