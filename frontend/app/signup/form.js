"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SunIcon, MoonIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";
import Glogo from "./Glogo.png";
import Alogo from "./Alogo.png";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches){
      setDarkMode(true);
    }
  }, []);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        { username: email, password: password },
        { withCredentials: true }
      );

      const userId = response.data.user_id;
      localStorage.setItem("userId", userId);
      router.push("/mainWeb");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`${darkMode ? "white" : ""}`}>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 transition-all duration-300">
        <div className="relative w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80">
          <button
            onClick={toggleTheme}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
          >
            {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>

          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">Sign In</h2>

          <form className="mt-6" onSubmit={handleSubmit}>
            {/* Email */}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="text"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            {/* Password */}
            <label className="block mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-10 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="accent-blue-500" />
                <span>Remember me</span>
              </label>
              <a href="#" className="hover:underline text-blue-600 dark:text-blue-400">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
              Sign In
            </button>

            {/* Sign Up Link */}
            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <a href="/newuser" className="text-blue-600 dark:text-blue-400 hover:underline">
                Sign Up
              </a>
            </p>

            {/* Or With */}
            <p className="mt-6 text-center text-gray-500 dark:text-gray-400">Or sign in with</p>

            {/* Social Login Buttons */}
            <div className="mt-4 flex space-x-4">
              <button className="w-1/2 flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 hover:scale-105 transition">
                <Image src={Glogo} alt="Google" width={20} height={20} />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Google</span>
              </button>
              <button className="w-1/2 flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 hover:scale-105 transition">
                <Image src={Alogo} alt="Apple" width={20} height={20} />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Apple</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
