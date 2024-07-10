"use client";

import React, { useEffect, useState } from 'react';
import axios from '@/app/services/authenticatedAxiosInstance';
import axiosInstance from '@/app/services/axiosInstance';
import { URL } from 'url'; // Import URL from 'url' module
import DeathRecordItem from './DeathRecordItem'; // Import DeathRecordItem component

interface DeathRecord {
    id: number;
    deceasedName: string;
    dateOfDeath: string;
    placeOfDeath: string;
    causeOfDeath: string;
    registeredBy: string | null;
    registrationDate: string | null;
    status: boolean;
}

const DeathRecordsList: React.FC = () => {
    const [deathRecords, setDeathRecords] = useState<DeathRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [tokenAvailable, setTokenAvailable] = useState<boolean>(false); // State to track token presence

    useEffect(() => {
        // Check if token is available in local storage
        const token = localStorage.getItem('token');
        setTokenAvailable(!!token); // Set tokenAvailable based on whether token exists

        const fetchDeathRecords = async () => {
            try {
                const response = await axios.get('/public/death/fetchAll');
                setDeathRecords(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching death records:', error);
                setError('Failed to fetch death records.');
                setLoading(false);
            }
        };

        fetchDeathRecords();
    }, []);

    if (loading) {
        return <p className="text-gray-600">Loading death records...</p>;
    }

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Death Records List</h2>
            {deathRecords.length === 0 ? (
                <p className="text-gray-600">No death records found.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {deathRecords.map((record) => (
                        <DeathRecordItem
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

export default DeathRecordsList;
