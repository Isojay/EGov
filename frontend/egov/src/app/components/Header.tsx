// src/app/components/Header.tsx
"use client"
// src/app/components/Header.tsx

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToken } from '@/app/context/TokenContext';

const Header: React.FC = () => {
    const { token, setToken } = useToken();
    const router = useRouter();
    const [isBirthDropdownOpen, setIsBirthDropdownOpen] = useState(false);
    const [isDeathDropdownOpen, setIsDeathDropdownOpen] = useState(false);
    const birthDropdownRef = useRef<HTMLDivElement>(null); // Separate ref for birth dropdown
    const deathDropdownRef = useRef<HTMLDivElement>(null); // Separate ref for death dropdown

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        window.location.reload();
    };

    const toggleBirthDropdown = () => {
        setIsBirthDropdownOpen(!isBirthDropdownOpen);
        setIsDeathDropdownOpen(false); // Close the death dropdown when opening birth dropdown
    };

    const toggleDeathDropdown = () => {
        setIsDeathDropdownOpen(!isDeathDropdownOpen);
        setIsBirthDropdownOpen(false); // Close the birth dropdown when opening death dropdown
    };

    const closeDropdowns = () => {
        setIsBirthDropdownOpen(false);
        setIsDeathDropdownOpen(false);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                birthDropdownRef.current && !birthDropdownRef.current.contains(event.target as Node) &&
                deathDropdownRef.current && !deathDropdownRef.current.contains(event.target as Node)
            ) {
                closeDropdowns();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLinkClick = (href: string) => {
        router.push(href);
        closeDropdowns();
    };

    return (

        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto" style={{maxWidth: '90%'}}>
                <div className="flex justify-between items-center">
                    <div>
                        <Link href="/" passHref>
                            <span className="text-xl font-bold cursor-pointer">
                                Birth and Death Registration System
                            </span>
                        </Link>
                    </div>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <Link href="/" passHref>
                                    <span className="cursor-pointer">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/search" passHref>
                                    <span className="cursor-pointer">Search</span>
                                </Link>
                            </li>
                            <li className="relative" ref={birthDropdownRef}>
                                <div className="group">
                                    <span
                                        className="flex items-center space-x-1 cursor-pointer"
                                        onClick={toggleBirthDropdown}
                                    >
                                        Register Birth
                                        <svg
                                            className={`w-4 h-4 fill-current ${isBirthDropdownOpen ? 'text-gray-600' : 'text-gray-400'} transition duration-150 ease-in-out ml-1`}
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 12l-6-6h12l-6 6z"
                                            />
                                        </svg>
                                    </span>
                                    {isBirthDropdownOpen && (
                                        <div
                                            className="absolute bg-white text-gray-800 shadow-lg mt-2 py-2 w-48 rounded-md z-10">
                                            <ul className="space-y-2">
                                                <li>
                                                    <Link href="/register-birth" passHref>
                                                        <span
                                                            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                                            Register Birth
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/list-records-birth" passHref>
                                                        <span
                                                            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                                            List Records
                                                        </span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </li>
                            <li className="relative" ref={deathDropdownRef}>
                                <div className="group">
                                    <span
                                        className="flex items-center space-x-1 cursor-pointer"
                                        onClick={toggleDeathDropdown}
                                    >
                                        Register Death
                                        <svg
                                            className={`w-4 h-4 fill-current ${isDeathDropdownOpen ? 'text-gray-600' : 'text-gray-400'} transition duration-150 ease-in-out ml-1`}
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 12l-6-6h12l-6 6z"
                                            />
                                        </svg>
                                    </span>
                                    {isDeathDropdownOpen && (
                                        <div
                                            className="absolute bg-white text-gray-800 shadow-lg mt-2 py-2 w-48 rounded-md z-10">
                                            <ul className="space-y-2">
                                                <li>
                                                    <Link href="/register-death" passHref>
                                                        <span
                                                            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                                            Register Death
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/list-records-death" passHref>
                                                        <span
                                                            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                                            List Records
                                                        </span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </li>
                            {localStorage.getItem('token') ? (
                                <li>
                                    <button onClick={handleLogout} className="text-red-500">Log Out</button>
                                </li>
                            ) : (
                                <li>
                                    <Link href="/login" passHref>
                                        <span className="cursor-pointer">Log In</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

    )
        ;
};

export default Header;
