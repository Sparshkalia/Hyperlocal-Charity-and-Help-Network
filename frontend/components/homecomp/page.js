"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";

const fadeInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const Homecomps = () => {
  return (
    <>
      <Navbar />

      {/* Background Gradient (Top) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="absolute inset-x-0 top-0 left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Main Container */}
      <div className=" bg-gray-200 min-h-screen py-12 px-4 lg:px-24 relative z-10 m-28 rounded-xl">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="text-center max-w-3xl mx-auto mb-16 bg-gray-500 shadow-xl rounded-3xl px-8 lg:px-24 py-12"
          >
            <h1 className="text-6xl font-extrabold text-white leading-tight">
              Be a <span className="text-black">Savior</span> for Many!
            </h1>
            <p className="mt-6 text-xl text-white tracking-wide">
              "The best way to find yourself is to lose yourself in the service of others."
            </p>
          </motion.div>

          {/* Blood Donation Story */}
          <div className="flex flex-col lg:flex-row items-center mt-16 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="lg:w-1/2 bg-gray-500 shadow-xl rounded-3xl px-8 lg:px-24 py-12"
            >
              <h2 className="text-4xl font-bold text-white">Donate Blood, Save Lives</h2>
              <p className="mt-4 text-lg text-white leading-relaxed">
                "A single pint can save three lives, a single gesture can create a million smiles."
              </p>
              <p className="mt-4 text-white tracking-wide">
                Blood donation is a selfless act that helps patients undergoing surgeries, cancer treatments, and trauma care.
              </p>
            </motion.div>
            <motion.img
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              src="/bdonation.png"
              alt="Blood Donation"
              className="lg:w-1/3 w-2/3 rounded-3xl shadow-lg border-4"
            />
          </div>

          {/* Organ Donation Story */}
          <div className="flex flex-col lg:flex-row-reverse items-center mt-16 gap-12 mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="lg:w-1/2 bg-gray-500 shadow-xl rounded-3xl px-8 lg:px-24 py-12"
            >
              <h2 className="text-4xl font-bold text-white">Give the Gift of Life</h2>
              <p className="mt-4 text-lg text-white leading-relaxed">
                "Don’t take your organs to heaven – heaven knows we need them here!"
              </p>
              <p className="mt-4 text-white tracking-wide">
                Organ donation provides a second chance at life for those in need. Registering ensures your legacy continues through saving others.
              </p>
            </motion.div>
            <motion.img
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              src="/organd.png"
              alt="Organ Donation"
              className="lg:w-1/3 w-2/3 rounded-3xl shadow-lg border-4"
            />
          </div>
        </div>
      </div>

      {/* Background Gradient (Bottom) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="absolute inset-x-0 top-0 left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </>
  );
};

export default Homecomps;
