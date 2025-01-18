"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
const Navbar = () => {
    const router = useRouter();
    const handleSignup = () => {
        router.push('/signup');
    };
    return (
        <nav>
            <button className='absolute top-0 right-0 border p-1 m-4 bg-gray-300 text-black rounded-xl' onClick={handleSignup}>Sign Up</button>
        </nav>
    );
};

export default Navbar;
