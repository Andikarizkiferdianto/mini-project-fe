import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar";

const BackupData = () => {
    const [files, setFiles] = useState([]);

    const fetchFiles = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/backup-data");
            setFiles(res.data.files);
        } catch (err) { console.error(err); }
    };

    const handleBackup = async () => {
        Swal.fire({ title: 'Proses Backup...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        try {
            await axios.post("http://localhost:8000/api/backup-data");
            Swal.fire("Berhasil!", "Data telah dibackup.", "success");
            fetchFiles();
        } catch (err) {
            Swal.fire("Gagal", "Periksa path mysqldump di server", "error");
        }
    };

    useEffect(() => { fetchFiles(); }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-4 mt-16">
                 <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6">
                     <h1 className="text-3xl font-normal text-gray-800 mb-8">Backup Data Partial</h1>
                     <button onClick={handleBackup} className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded text-lg">
                        Backup Sekarang
                     </button>
                     <hr className="my-10 border-gray-300" />
                    <div>
                        <h2 className="text-2xl text-gray-800 mb-4">File Backup Tersedia</h2>
                        <ul className="list-disc pl-8 space-y-2">
                            {files.map((file, i) => (
                                <li key={i}><span className="text-blue-600 text-lg">{file}</span></li>
                            ))}
                        </ul>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default BackupData;