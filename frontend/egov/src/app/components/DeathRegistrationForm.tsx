"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeathRegistrationForm: React.FC = () => {
    const [deceasedName, setDeceasedName] = useState('');
    const [dateOfDeath, setDateOfDeath] = useState('');
    const [placeOfDeath, setPlaceOfDeath] = useState('');
    const [causeOfDeath, setCauseOfDeath] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const deathRecord = {
            deceasedName,
            dateOfDeath: new Date(dateOfDeath), // Convert to Date object if necessary
            placeOfDeath,
            causeOfDeath,
            registrationDate: new Date(), // Assuming current date/time
        };

        try {
            const response = await axios.post('http://localhost:8080/public/death/register', deathRecord, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                toast.success('Death record registered successfully!');
                setDeceasedName('');
                setDateOfDeath('');
                setPlaceOfDeath('');
                setCauseOfDeath('');
            }
        } catch (error) {
            console.error('Failed to register death record:', error);
            toast.error('Failed to register death record.');
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8 mt-8">
                <h2 className="text-2xl font-bold text-center mb-4">Register Death</h2>
                <div className="mb-4">
                    <label htmlFor="deceasedName" className="block text-gray-700 text-sm font-bold mb-2">
                        Deceased Name:
                    </label>
                    <input
                        type="text"
                        id="deceasedName"
                        value={deceasedName}
                        onChange={(e) => setDeceasedName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dateOfDeath" className="block text-gray-700 text-sm font-bold mb-2">
                        Date of Death:
                    </label>
                    <input
                        type="date"
                        id="dateOfDeath"
                        value={dateOfDeath}
                        onChange={(e) => setDateOfDeath(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="placeOfDeath" className="block text-gray-700 text-sm font-bold mb-2">
                        Place of Death:
                    </label>
                    <input
                        type="text"
                        id="placeOfDeath"
                        value={placeOfDeath}
                        onChange={(e) => setPlaceOfDeath(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="causeOfDeath" className="block text-gray-700 text-sm font-bold mb-2">
                        Cause of Death:
                    </label>
                    <input
                        type="text"
                        id="causeOfDeath"
                        value={causeOfDeath}
                        onChange={(e) => setCauseOfDeath(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Register Death
                    </button>
                </div>
            </form>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
};

export default DeathRegistrationForm;
