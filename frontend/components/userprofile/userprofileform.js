import { useState, useEffect } from 'react';
import Image from 'next/image';
import { updateUser } from '@/lib/api'; 

export default function ProfileForm({ userId, profiles, setProfiles }) {
    const DEFAULT_PROFILE_PIC = '/slogo.png';
    
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        username: '',
        createdAt: '',
    });

    const [profilePic, setProfilePic] = useState(null);
    const [profilePicType, setProfilePicType] = useState(null);

    useEffect(() => {
        if (profiles) {
            setFormData({
                fullname: profiles.fullname || '',
                email: profiles.email || '',
                username: profiles.username || '',
                createdAt: profiles.createdAt || '',
            });
            // Only set profile pic if it's not an empty string
            setProfilePic(profiles.profile_pic && profiles.profile_pic !== '' 
                ? profiles.profile_pic 
                : DEFAULT_PROFILE_PIC);
        }
    }, [profiles]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
                setProfilePicType(file.type);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Only include profile pic in payload if it's not the default image
        const imagePayload = profilePic !== DEFAULT_PROFILE_PIC ? [profilePic] : [];

        try {
            const updatedUser = await updateUser(
                userId,
                formData.fullname,
                imagePayload, 
                profilePicType
            );

            setProfiles(updatedUser);
            alert('Profile updated successfully!');
        } catch (error) {
            alert(error.message || 'Failed to update profile.');
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center space-x-4 mb-6">
                    <Image
                        src={'/slogo.png'}
                        alt="Profile Avatar"
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        id="profilePicInput"
                    />
                    <label htmlFor="profilePicInput" className="cursor-pointer text-blue-500 font-semibold">
                        Change Picture
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 text-sm">Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded text-black"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 text-sm">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded text-black"
                        disabled
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 text-sm">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded text-black"
                        disabled
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600 text-sm">Account Created On</label>
                    <input
                        type="text"
                        name="createdAt"
                        value={formData.createdAt}
                        readOnly
                        className="w-full mt-1 p-2 border border-gray-300 bg-gray-100 rounded text-black cursor-not-allowed"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                >
                    Save Profile
                </button>
            </form>
        </div>
    );
}