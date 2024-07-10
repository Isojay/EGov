"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import AuthenticatedDataComponent from "@/app/components/AuthenticatedDataComponent";

const HomePage: React.FC = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('user');
        console.log(role + token);
        if (token && role === 'USER') {
            // Perform any actions or state updates based on token and role here
            console.log('User is authenticated as a user.');
        } else {
            // Handle case where user is not authenticated as a user
            console.log('User is not authenticated as a user.');
        }
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <main className="container mx-auto px-4 py-8 w-4/5">
                <section className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">Welcome to the Birth and Death Registration System</h1>
                    <p className="text-lg">Our platform aims to streamline the registration process for births and deaths in Nepal.</p>
                </section>

                {localStorage.getItem('token') && localStorage.getItem('user') === 'USER' && <AuthenticatedDataComponent />}

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white shadow-md rounded-md p-4">
                        <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
                        <ul className="space-y-2">
                            <li><Link href="/register-birth"><span className="text-blue-500 hover:underline">Register a Birth</span></Link></li>
                            <li><Link href="/register-death"><span className="text-blue-500 hover:underline">Register a Death</span></Link></li>
                            <li><Link href="/search"><span className="text-blue-500 hover:underline">Search Records</span></Link></li>
                        </ul>
                    </div>

                    <div className="bg-white shadow-md rounded-md p-4">
                        <h2 className="text-xl font-semibold mb-2">Information</h2>
                        <p>Find information about birth and death registration procedures, FAQs, and more.</p>
                        <p className="mt-2"><Link href="/info"><span className="text-blue-500 hover:underline">Learn More</span></Link></p>
                    </div>

                    <div className="bg-white shadow-md rounded-md p-4">
                        <h2 className="text-xl font-semibold mb-2">News and Updates</h2>
                        <p>Stay updated with the latest news, changes, and announcements related to birth and death registration.</p>
                        <p className="mt-2"><Link href="/news"><span className="text-blue-500 hover:underline">Read Updates</span></Link></p>
                    </div>
                </section>

                <section className="mt-8">
                    <p>For any inquiries or assistance, please <Link href="/contact"><span className="text-blue-500 hover:underline">Contact us</span></Link>.</p>
                </section>
            </main>
            <ToastContainer />
        </div>
    );
};

export default HomePage;
