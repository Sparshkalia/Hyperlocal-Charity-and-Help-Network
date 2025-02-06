import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "./profilecomponents";

function Usericon() {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const { profileContent, setProfileContent } = useProfile();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedProfile = localStorage.getItem("fullname");
        const storedUserId = localStorage.getItem("userId");

        if (storedProfile) {
            try {
                const profile = JSON.parse(storedProfile);
                setProfileContent(profile); // Update profile content from context
            } catch (error) {
                console.error("Failed to parse profile data:", error);
                // Handle the error, e.g., clear the invalid data
                localStorage.removeItem("fullname");
            }
        }

        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, [setProfileContent]);

    const handleClick = () => {
        if (userId) {
            router.push(`/profile/${userId}`);
        } else {
            console.error("User ID not found!");
        }
    };

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
        <div
            className="fixed top-4 right-4 z-50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                className="border p-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition flex items-center shadow-md"
                onClick={handleClick}
            >
                <CgProfile size={40} className="text-gray-600" />
            </button>
            <AnimatePresence>
                {isHovered && profileContent && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 flex flex-col items-start space-y-3 border w-48">
                        <div className="text-black">
                            <h2>User</h2>
                        </div>
                        <hr className="w-full border-gray-300" />
                        <button
                            onClick={handleProfileClick}
                            className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded-lg"
                        >
                            View Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left text-red-500 hover:bg-red-100 p-2 rounded-lg"
                        >
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Usericon;