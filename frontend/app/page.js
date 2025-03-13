"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import Navbar from "@/components/navbar";
import Homecomps from "@/components/homecomp/page";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import ImageCarousel from "@/components/imagecousel/page";
import { useRouter } from "next/navigation";

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
      showCursor: false,
    });

    return () => {
      if (typed) {
        typed.destroy();
      }
    };
  }, []);
  const route=useRouter()
  const handlelogin=()=>{
    route.push('/signup')
  }
  return (
    <>
      <Navbar />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
      <div className="relative min-h-screen  overflow-hidden">
        <motion.div 
          className="container mx-auto flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 sm:px-12 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="text-center lg:text-left max-w-2xl space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Welcome to the <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Hyperlocal Charity Network</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Connecting <strong>local volunteers, donors, and those in need</strong> to create impactful change.
            </p>
            <motion.p 
              ref={typedRef} 
              className="text-xl font-semibold text-indigo-600 dark:text-indigo-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-800 text-white font-semibold rounded-full shadow-lg transition-transform"
              onClick={handlelogin}
            >
              Get Involved
            </motion.button>
          </motion.div>

          <motion.div 
            className="w-full max-w-md sm:max-w-lg lg:max-w-xl mt-8 lg:mt-0 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <iframe
              src="https://lottie.host/embed/3182b22d-8c48-4ba4-bcd7-9891d2cbe4f4/xGYAC01qiE.lottie"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] shadow-xl rounded-lg"
            ></iframe>
          </motion.div>
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
        {/* Testimonials */}
        <section className="py-16 px-6 sm:px-12 bg-gray-100 dark:bg-gray-900 text-center">
          <motion.div 
            className="container mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-8">Voices of Kindness</h2>
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Emily Johnson", role: "Beneficiary" },
                { name: "David Martinez", role: "Volunteer" },
                { name: "Sophia Williams", role: "Donor" }
              ].map((person, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                >
                  <p className="text-gray-700 dark:text-gray-400">"This platform changed my life by connecting me with people who truly care."</p>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-200">{person.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{person.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        <ImageCarousel/>
<Homecomps/>
        {/* Footer */}
        <footer className="bg-gray-700 text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">About Us</h2>
          <p className="text-gray-400 text-sm">
            We are committed to making a difference by connecting communities
            with meaningful charitable opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="/about" className="hover:text-indigo-400">About</Link></li>
            <li><Link href="/blog" className="hover:text-indigo-400">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-indigo-400">Contact</Link></li>
            <li><Link href="/donate" className="hover:text-indigo-400">Donate</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-bold mb-4">Connect With Us</h2>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-indigo-400"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-indigo-400"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-indigo-400"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-indigo-400"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Hyperlocal Charity Network. All rights reserved.</p>
      </div>
    </footer>
      </div>
    </>
  );
};

export default Page;
