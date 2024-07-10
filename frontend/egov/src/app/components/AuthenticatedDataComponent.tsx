"use client"

import React, { useEffect, useState } from 'react';
import authenticatedAxiosInstance from '../services/authenticatedAxiosInstance';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BirthRecordItem from "@/app/components/BirthRecordItem";
import DeathRecordItem from "@/app/components/DeathRecordItem";

interface BirthRecord {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    birthPlace: string;
    fatherName: string;
    motherName: string;
    gender: string;
    registeredBy: string | null;
    registrationDate: string | null;
    appliedBy: string;
    status: boolean;
}

interface DeathRecord {
    id: number;
    deceasedName: string;
    dateOfDeath: string;
    placeOfDeath: string;
    causeOfDeath: string;
    registeredBy: string | null;
    registrationDate: string;
    appliedBy: string;
    status: boolean;
}

interface ApiResponse {
    message: string;
    statusCode: string;
    details: {
        birth: BirthRecord[];
        death: DeathRecord[];
    };
}

const AuthenticatedDataComponent: React.FC = () => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await authenticatedAxiosInstance.get<ApiResponse>('/auth/user/fetchAll');
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                toast.error('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    if (loading) {
        return <p>Loading data...</p>;
    }

    if (!data) {
        return null; // Handle this case as per your application's requirements
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Data</h1>
            {data.details.birth.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold">Birth Records</h2>
                    <ul>
                        {data.details.birth.map((record) => (
                            <BirthRecordItem
                                key={record.id}
                                record={record}
                                tokenAvailable={true}
                            />
                        ))}
                    </ul>
                </div>
            )}
            {data.details.death.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mt-4">Death Records</h2>
                    <ul>
                        {data.details.death.map((record) => (
                            <DeathRecordItem
                                key={record.id}
                                record={record}
                                tokenAvailable={true}
                            />
                        ))}
                    </ul>
                </div>
            )}
            {(data.details.birth.length === 0 && data.details.death.length === 0) && (
                <p>No records found.</p>
            )}
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
};

export default AuthenticatedDataComponent;
