"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "./profilecomponents";
import axios from "axios";

const DEFAULT_PROFILE_PIC = "/slogo.png"; // Default image if profile_pic is missing
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function Usericon() {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const { profileContent, setProfileContent } = useProfile();
    const [userId, setUserId] = useState(null);
    const [fullname, setFullname] = useState("Loading...");
    const [profilePic, setProfilePic] = useState(DEFAULT_PROFILE_PIC);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedProfile = localStorage.getItem("profileData");

        if (storedUserId) setUserId(storedUserId);

        if (storedProfile) {
            try {
                const parsedProfile = JSON.parse(storedProfile);
                setProfileContent(parsedProfile);
                setFullname(parsedProfile.full_name || "User");
                setProfilePic(parsedProfile.profile_pic || DEFAULT_PROFILE_PIC);
            } catch (error) {
                console.error("Failed to parse profile data:", error);
                localStorage.removeItem("profileData");
            }
        }
    }, [setProfileContent]);

    const fetchUserDetails = async () => {
        if (!userId) return;
        try {
            const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
                withCredentials: true,
            });

            if (response.data) {
                setProfileContent(response.data);
                setFullname(response.data.full_name || "User");
                setProfilePic(response.data.profile_pic || DEFAULT_PROFILE_PIC);
                localStorage.setItem("profileData", JSON.stringify(response.data));
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setFullname("User");
            setProfilePic(DEFAULT_PROFILE_PIC);
        }
    };

    useEffect(() => {
        if (!fullname || fullname === "Loading...") {
            fetchUserDetails();
        }
    }, [userId]);

    const handleProfileClick = () => {
        if (userId) {
            router.push(`/profile/${userId}`);
        } else {
            console.error("User ID not found!");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("profileData");
        router.push("/signup");
    };

    return (
        <div className="fixed top-4 right-4 z-50" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <button className="border p-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition flex items-center shadow-md" onClick={handleProfileClick}>
                <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full object-cover border border-gray-300" />
            </button>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center space-y-3 border w-48"
                    >
                        <img src={profilePic} alt="Profile" className="w-16 h-16 rounded-full object-cover border border-gray-300" />
                        <div className="text-black font-semibold text-center w-full">{fullname}</div>
                        <hr className="w-full border-gray-300" />
                        <button onClick={handleProfileClick} className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded-lg">
                            View Profile
                        </button>
                        <button onClick={handleLogout} className="w-full text-left text-red-500 hover:bg-red-100 p-2 rounded-lg">
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Usericon;
