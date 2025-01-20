'use client';
import { useState } from 'react';
import Image from 'next/image';
import ProfileForm from './userprofileform';
import { IoSettings } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const [profiles, setProfiles] = useState({
        id: "1",
        firstName: "Ram",
        lastName: "Charan",
        email: "ram2@gmail.com",
        country: "India",
        city: "Delhi",
        following: 345,
        followers: 124,
        events: 63,
        profilePic: '/slogo.png', 
    });
    const rout=useRouter()
    const handlepost=(e)=>{
        e.preventDefault()
        rout.push('/mainWeb')
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
        <aside className="w-64 bg-white shadow-lg">
            <div className="p-6">
            <h1 className="text-xl font-bold text-gray-800">PROFILE</h1>
            </div>
            <nav className="mt-6">
            <ul>
                <li className="flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                <button onClick={handlepost} className='pr-44'>Posts</button>
                </li>
                <li className="flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                <button className='pr-44'>Chats</button>
                </li>
                <li className="flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                <span>👤</span>
                <button className='pr-36'>Profile</button>
                </li>
                <li className="flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                <span><IoSettings size={20} /></span>
                <button className='pr-36'>Settings</button>
                </li>
            </ul>
            </nav>
        </aside>

        <div className="flex-1 p-8">
            <div className="flex space-x-8">
                <div className="w-1/3 bg-white shadow-lg rounded-lg p-6">
                <Image
                    src={profiles.profilePic}
                    alt="User Profile"
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain rounded-lg"
                    priority
                    />
                    <div className="text-center mt-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        {profiles.firstName} {profiles.lastName}
                    </h2>
                    <p className="text-gray-600">{profiles.city}, {profiles.country}</p>
                    <p className="text-blue-500 mt-2">{profiles.email}</p>
                    </div>
                    <div className="flex justify-between mt-6 text-center">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{profiles.following}</h3>
                        <p className="text-gray-600">Following</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{profiles.followers}</h3>
                        <p className="text-gray-600">Followers</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{profiles.events}</h3>
                        <p className="text-gray-600">No. of Posts</p>
                    </div>
                    </div>
                </div>
                <div className="flex-1">
                    <ProfileForm profiles={profiles} setProfiles={setProfiles} />
                </div>
                </div>
            </div>
        </div>
    );
    }
