'use client';
import { useProfile } from '@/components/userprofile/profilecomponents'; // Import the context hook
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProfileForm from './userprofileform';
import { IoSettings } from 'react-icons/io5';

export default function ProfilePage() {
    const { profileContent, setProfileContent } = useProfile(); // Use context instead of local state
    const router = useRouter();

    const handlePost = (e) => {
        e.preventDefault();
        router.push('/postadder');
    };

    const handleBack = (e) => {
        e.preventDefault();
        router.push('/mainWeb');
    };

    const handleChat = (e) => {
        e.preventDefault();
        router.push('/chatpage');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside className="w-64 bg-white shadow-lg">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-gray-800">PROFILE</h1>
                </div>
                <nav className="mt-6">
                    <ul>
                        <li className="flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                            <button onClick={handleBack} className='pr-44'>Back</button>
                        </li>
                        <li className="flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                            <button onClick={handlePost} className='flex-1 text-left'>Add Posts</button>
                        </li>
                        <li className="flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                            <button onClick={handleChat} className='pr-44'>Chats</button>
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

            <div className="flex flex-1 justify-center items-start p-6 space-x-6">
                <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 text-center">
                    {profileContent ? (
                        <>
                            <Image
                                src={profileContent.profilePic}
                                alt="User Profile"
                                width={150}
                                height={150}
                                className="rounded-full mx-auto"
                                priority
                            />
                            <h2 className="text-2xl font-bold text-gray-800 mt-4">
                                {profileContent.fullname}
                            </h2>
                            <p className="text-gray-600">@{profileContent.username}</p>
                            <p className="text-blue-500 mt-2">{profileContent.email}</p>
                            <p className="text-sm text-gray-500 mt-4">
                                Joined on: {profileContent.createdAt}
                            </p>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className="w-2/3 bg-white shadow-lg rounded-lg p-6">
                    <ProfileForm profiles={profileContent} setProfiles={setProfileContent} />
                </div>
            </div>
        </div>
    );
}