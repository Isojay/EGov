// src/app/components/BirthRecordsList.tsx
"use client"

import React, { useEffect, useState } from 'react';
import axios from '@/app/services/authenticatedAxiosInstance';
import axiosInstance from "@/app/services/axiosInstance";
import BirthRecordItem from './BirthRecordItem'; // Import BirthRecordItem component

const BirthRecordsList: React.FC = () => {
    const [birthRecords, setBirthRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [tokenAvailable, setTokenAvailable] = useState<boolean>(false); // State to track token presence

    useEffect(() => {
        // Check if token is available in local storage
        const token = localStorage.getItem('token');
        setTokenAvailable(!!token); // Set tokenAvailable based on whether token exists

        const fetchBirthRecords = async () => {
            try {
                const response = await axios.get('/public/birth/fetchAll');
                setBirthRecords(response.data);
                console.log(response.data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching birth records:', error);
                setError('Failed to fetch birth records.');
                setLoading(false);
            }
        };

        fetchBirthRecords();
    }, []);

    if (loading) {
        return <p className="text-gray-600">Loading birth records...</p>;
    }

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Birth Records List</h2>
            {birthRecords.length === 0 ? (
                <p className="text-gray-600">No birth records found.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {birthRecords.map((record) => (
                        <BirthRecordItem
                            key={record.id}
                            record={record}
                            tokenAvailable={tokenAvailable}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BirthRecordsList;
