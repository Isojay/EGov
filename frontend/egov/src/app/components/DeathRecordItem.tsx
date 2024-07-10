// DeathRecordItem.tsx

import React from 'react';
import axiosInstance from '@/app/services/axiosInstance';

interface Props {
    record: {
        id: number;
        deceasedName: string;
        dateOfDeath: string;
        placeOfDeath: string;
        causeOfDeath: string;
        registeredBy: string | null;
        registrationDate: string | null;
        status: boolean;
    };
    tokenAvailable: boolean;
}

const DeathRecordItem: React.FC<Props> = ({ record, tokenAvailable }) => {
    const handleVerify = async (id: number) => {
        try {
            await axiosInstance.post(`/public/death/verify/${id}`);
            // Assuming the backend updates the record status, you may want to refresh the list here
            // fetchDeathRecords(); // Refresh death records after verification
        } catch (error) {
            console.error('Error verifying death record:', error);
            // Handle error as needed
        }
    };

    const handleDownloadPDF = async (id: number) => {
        try {
            const response = await axiosInstance.get(`/public/pdf/generate/${id}`, {
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
                    <p className="text-xl font-semibold">{record.deceasedName}</p>
                    <div className="grid grid-cols-2 gap-x-4 mt-2">
                        <div>
                            <p className="text-sm text-gray-600">Place of Death:</p>
                            <p className="text-sm">{record.placeOfDeath}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Date of Death:</p>
                            <p className="text-sm">{record.dateOfDeath ? new Date(record.dateOfDeath).toLocaleDateString() : '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Cause of Death:</p>
                            <p className="text-sm">{record.causeOfDeath}</p>
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
                                {record.status ? 'Verified' : 'Not Verified'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    {tokenAvailable && localStorage.getItem('user') === 'ADMIN' && !record.status && (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                            onClick={() => handleVerify(record.id)}
                        >
                            Verify
                        </button>
                    )}
                    {tokenAvailable && record.status && (
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleDownloadPDF(record.id)}
                        >
                            Download PDF
                        </button>
                    )}
                </div>
            </div>
        </li>
    );
};

export default DeathRecordItem;
