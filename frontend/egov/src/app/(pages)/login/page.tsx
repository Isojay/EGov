// pages/page.tsx
"use client"
import LoginForm from '../../components/LoginForm';
import React from "react";
import { useRouter } from 'next/navigation'; // Import useRouter hook

const LoginPage: React.FC = () => {

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
