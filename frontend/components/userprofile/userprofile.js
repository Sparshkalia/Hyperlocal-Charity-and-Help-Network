import { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import Image from 'next/image';
import ProfileForm from './userprofileform';
import { IoSettings } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const [profiles, setProfiles] = useState({
        id: "",
        fullname: "",
        username: "",
        email: "",
        profilePic: '/slogo.png', // Default image in case profile_pic is null
        profilePicType: "",
        createdAt: "",
        following: 345, // Static placeholder as API doesn't provide this
        followers: 124,
        events: 63,
    });

    const [userid, setUserid] = useState(null); // Define userid state

    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/user/${userid}`);
            setProfiles(response.data); // Update setUserData to setProfiles
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        if (userid) {
          fetchUserData();
        }
      }, [userid]);

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
                                {profiles.fullname} {profiles.username}
                            </h2>
                            <p className="text-blue-500 mt-2">{profiles.email}</p>
                            <p className="text-gray-600">Joined on {profiles.createdAt}</p>
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