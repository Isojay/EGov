// src/app/components/LoginForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useToken } from '@/app/context/TokenContext';
import RegistrationForm from './RegistrationForm';
import axiosInstance from "@/app/services/axiosInstance";

interface LoginResponse {
    message: string;
    statusCode: string;
    details: {
        token: string;
        role: string;
    };
}

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>(''); // Ensure email state is properly typed as string
    const [password, setPassword] = useState<string>(''); // Ensure password state is properly typed as string
    const [isRegistering, setIsRegistering] = useState<boolean>(false); // State to toggle between login and registration
    const router = useRouter(); // Initialize the router from next/navigation
    const { setToken } = useToken();
    const AuthenticationRequest = {
        email,
        password
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post<LoginResponse>('/public/authenticate', AuthenticationRequest, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.statusCode === 'OK') {
                const { token } = response.data.details;
                const { role } = response.data.details;
                localStorage.setItem('token', token);
                localStorage.setItem('user',role);
                console.log(role + token);
                setToken(token);
                toast.success(response.data.message);

                router.push('/');
            } else {
                toast.error('Login failed');
            }
        } catch (error) {
            console.error('Failed to log in:', error);
            toast.error('Failed to log in');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
            {isRegistering ? (
                <RegistrationForm />
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Log In
                        </button>
                        <button
                            type="button"
                            className="text-blue-500 hover:text-blue-800 text-sm"
                            onClick={() => setIsRegistering(true)}
                        >
                            Register
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default LoginForm;
