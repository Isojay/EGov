// src/app/components/BirthRecordItem.tsx

import React from 'react';
import axios from '@/app/services/authenticatedAxiosInstance';
import axiosInstance from "@/app/services/axiosInstance";

interface BirthRecordItemProps {
    record: any; // Adjust type as per your BirthRecord type
    tokenAvailable: boolean;
}

const BirthRecordItem: React.FC<BirthRecordItemProps> = ({ record, tokenAvailable }) => {

    const handleVerify = async () => {
        try {
            await axios.get(`/public/birth/verify/${record.id}`);
            window.location.reload();
        } catch (error) {
            console.error('Error verifying birth record:', error);
            // Handle error as needed
        }
    };

    const handleDownloadPDF = async () => {
        try {
            const response = await axiosInstance.get(`/public/pdf/generate/birth/${record.id}`, {
                responseType: 'blob', // Set responseType to 'blob' for downloading files
            });

            // Create a blob URL for the downloaded file
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            // Open a new tab with the PDF file
            const newTab = window.open(url, '_blank');

            // Clean up by revoking the blob URL
            window.URL.revokeObjectURL(url);

            if (newTab) {
                // Close the tab after a delay (e.g., 5 seconds)
                setTimeout(() => {
                    newTab.close();
                }, 5000); // Adjust the time delay as needed
            } else {
                console.error('Failed to open new tab for download.');
                // Handle error as needed
            }
        } catch (error) {
            console.error('Error downloading PDF:', error);
            // Handle error as needed
        }
    };

    return (
        <li className="py-4">
            <div className="border border-gray-300 p-4 rounded-lg hover:shadow-lg flex justify-between items-center">
                <div className="w-full">
                    <p className="text-xl font-semibold">{record.firstName} {record.lastName}</p>
                    <div className="grid grid-cols-2 gap-x-4 mt-2">
                        <div>
                            <p className="text-sm text-gray-600">Birth Place:</p>
                            <p className="text-sm">{record.birthPlace}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Date of Birth:</p>
                            <p className="text-sm">{record.dateOfBirth ? new Date(record.dateOfBirth).toLocaleDateString() : '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Father's Name:</p>
                            <p className="text-sm">{record.fatherName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Mother's Name:</p>
                            <p className="text-sm">{record.motherName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Registered By:</p>
                            <p className="text-sm">{record.registeredBy}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Registration Date:</p>
                            <p className="text-sm">{record.registrationDate ? new Date(record.registrationDate).toLocaleDateString() : '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Status:</p>
                            <p className={`text-sm ${record.status ? 'text-green-600' : 'text-red-600'}`}>
                                {record.status ? "Verified" : "Not Verified"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    {tokenAvailable && localStorage.getItem('user') === 'ADMIN' && !record.status && (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleVerify}
                        >
                            Verify
                        </button>
                    )}
                    {tokenAvailable && record.status && (
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleDownloadPDF}
                        >
                            Download PDF
                        </button>
                    )}
                </div>
            </div>
        </li>
    );
};

export default BirthRecordItem;
