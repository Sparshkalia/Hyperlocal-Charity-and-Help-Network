import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProfileForm({ profiles, setProfiles }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        city: ''
    });

    useEffect(() => {
        setFormData({
        firstName: profiles.firstName,
        lastName: profiles.lastName,
        email: profiles.email,
        country: profiles.country,
        city: profiles.city,
        });
    }, [profiles]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProfiles((prev) => ({
        ...prev,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        country: formData.country,
        city: formData.city,
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfiles((prev) => ({
            ...prev,
            profilePic: reader.result, 
            }));
        };
        reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Change Your Profile</h2>
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-4 mb-6">
                <Image
                src={profiles.profilePic} 
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
            <br />
            <div>
                <label className="block text-gray-600 text-sm">First Name</label>
                <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded text-black"
                />
            </div>
            <div>
                <label className="block text-gray-600 text-sm">Last Name</label>
                <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded text-black"
                />
            </div>
            </div>

            <div className="mb-4">
            <label className="block text-gray-600 text-sm">E-mail Address</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded text-black"
            />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
                <label className="block text-gray-600 text-sm">Country</label>
                <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded text-black"
                />
            </div>
            <div>
                <label className="block text-gray-600 text-sm">City</label>
                <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded text-black"
                />
            </div>
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
