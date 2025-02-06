"use client";   
import React, { useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import Typed from "typed.js";
import Homecomps from "@/components/homecomp/page";

const Page = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Connecting People in Need with Local Helpers",
        "Empowering Communities through Charity",
        "A Network of Kindness and Support",
        "Helping Neighbors, Strengthening Bonds",
        "Bringing Hope, One Act at a Time"
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => {
      typed.destroy(); // Cleanup to prevent memory leaks
    };
  }, []);

  return (
    <>
      {/* Background Shape */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between min-h-screen p-8">
        {/* Left Side - Text with Typing Effect */}
        <div className="text-left max-w-lg">
          <p className="text-3xl font-bold mb-4">
            Welcome to the <span className="text-blue-500">Hyperlocal Charity and Help Network</span>
          </p>
          <p className="mb-8 text-lg">
            Our platform ensures direct and meaningful assistance by connecting **local volunteers, donors, and people in need.**  
            <br />  
            <span className="text-indigo-600 font-semibold" ref={typedRef}></span>
          </p>
        </div>

        {/* Right Side - Animated Illustration */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <iframe
            src="https://lottie.host/embed/3182b22d-8c48-4ba4-bcd7-9891d2cbe4f4/xGYAC01qiE.lottie"
            className="w-full h-[500px] max-w-2xl"
          ></iframe>
        </div>
      </div>
      
        <div>
            <Homecomps/>
        </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >

        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
      <footer className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-12">
      <div className="container mx-auto text-center">
        <p className="text-lg mb-4">
          "Together, we make a difference in the lives of those who need it most."
        </p>
        <div className="flex justify-center gap-8">
          {/* Social Media Icons */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-300 transition-colors"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-300 transition-colors"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-300 transition-colors"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <p className="mt-8 text-sm">
          © 2025 Hyperlocal Charity Network. All rights reserved.
        </p>
      </div>
    </footer>
    </>
  );
};

export default Page;
