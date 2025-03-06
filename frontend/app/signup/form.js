"use client";
<<<<<<< HEAD
import {useState} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {useRouter} from 'next/navigation';
import Glogo from './Glogo.png';
import Alogo from './Alogo.png';
import axios from 'axios';

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const route = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', {
                username: email,
                password: password,
            }, {
                withCredentials: true
            });
    
            const userId = response.data.user_id;
            localStorage.setItem("userId", userId);
            route.push("/mainWeb");
    
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <StyledWrapper>
        <div className="flex justify-center items-center min-h-screen">
            <form className="form flex justify-center" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex-column">
                    <label>Email </label>
                </div>
                <div className="inputForm">
                    <input type="text" className="input text-black" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)} size="40"/>
                </div>
                <div className="flex-column">
                    <label>Password </label>
                </div>
                <div className="inputForm text-black">
                    <input type="password" className="input" placeholder="Enter your Password" value={password} onChange={(e)=>setPassword(e.target.value)} size="40"/>
                </div>
                <div className="flex-row">
                    <div>
                        <input type="checkbox" />
                        <label>Remember me </label>
                    </div>
                    <span className="span hover:underline">Forgot password?</span>
                </div>
                <button className="button-submit">Sign In</button>
                <p className="p">
                    Don't have an account? <span className="span hover:underline">Sign Up</span>
                </p>
                <p className="p line">Or With</p>
                <div className="flex-row">
                    <button className="btn google text-black p-2">
                        <Image src={Glogo} alt="Google" width={30} height={30} className="mx-2" />
                        Google
                    </button>
                    <button className="btn apple text-black p-2">
                        <Image src={Alogo} alt="Apple" width={30} height={30} className="mx-2" />
                        Apple
                    </button>
                </div>
            </form>
        </div>
    </StyledWrapper>
    );
};


const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #C0C0C0;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    background-color: #FFFFFF;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    transition: 0.2s ease-in-out;
  }

 .input {
    padding-left: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
}
  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .button-submit:hover {
    background-color: #252727;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
    ;
  }`;


export default Form;
=======
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
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
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
        {/* Form Container */}
        <div className="relative w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80">
          {/* Theme Toggle */}
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
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
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
>>>>>>> c193774 (Re-establish tracking after reinitialization)
