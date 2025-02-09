"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Homecomps = () => {
  const { theme } = useTheme();
  const [bgColor, setBgColor] = useState("bg-gray-100");
  const [textColor, setTextColor] = useState("text-gray-900");

  useEffect(() => {
    setBgColor(theme === "dark" ? "bg-gray-900" : "bg-gray-100");
    setTextColor(theme === "dark" ? "text-white" : "text-gray-900");
  }, [theme]);

  return (
    <div className={`min-h-screen py-12 px-4 lg:px-24 ${bgColor} transition-all duration-500`}>
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className={`text-center max-w-3xl mx-auto mb-16 shadow-xl rounded-3xl px-8 lg:px-24 py-12 ${textColor} bg-opacity-20 backdrop-blur-lg border border-gray-300 dark:border-gray-700`}
      >
        <h1 className="text-5xl font-extrabold leading-tight">
          Be the <span className="text-indigo-500">Change</span> You Want to See!
        </h1>
        <p className="mt-4 text-lg tracking-wide">
          "A small step from you can mean a giant leap for someone in need."
        </p>
        <Button className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg">
          Join the Mission
        </Button>
      </motion.div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Blood Donation Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className={`p-8 rounded-xl shadow-lg ${textColor} bg-opacity-20 backdrop-blur-lg border border-gray-300 dark:border-gray-700`}
        >
          <h2 className="text-3xl font-bold">Blood Donation: A Lifesaving Gift</h2>
          <p className="mt-4 text-lg">
            "Every drop you give is a heartbeat you save. Blood donation is the easiest way to make a significant impact."
          </p>
          <ul className="mt-4 list-disc list-inside text-md">
            <li>Helps accident victims and critical patients.</li>
            <li>Takes just a few minutes but can save lives.</li>
            <li>Improves your health by rejuvenating blood cells.</li>
          </ul>
          <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg">
            Donate Now
          </Button>
        </motion.div>

        {/* Organ Donation Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className={`p-8 rounded-xl shadow-lg ${textColor} bg-opacity-20 backdrop-blur-lg border border-gray-300 dark:border-gray-700`}
        >
          <h2 className="text-3xl font-bold">Organ Donation: A Second Chance</h2>
          <p className="mt-4 text-lg">
            "One decision can save multiple lives. Pledge your organs and be someone’s miracle."
          </p>
          <ul className="mt-4 list-disc list-inside text-md">
            <li>Vital for patients awaiting transplants.</li>
            <li>A lasting legacy that lives on after you.</li>
            <li>Registering is simple and takes minutes.</li>
          </ul>
          <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
            Pledge Now
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Homecomps;
