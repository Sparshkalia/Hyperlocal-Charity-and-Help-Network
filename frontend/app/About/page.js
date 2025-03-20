import React from 'react';
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
function About_page() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
    <div
      style={{
        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
      className="fixed inset-0 w-full h-full bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-40 blur-3xl -z-10"
    />
    <div
      style={{
        clipPath:
          'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
      }}
      className="fixed bottom-0 right-0 w-full md:w-2/3 h-2/3 bg-gradient-to-bl from-indigo-500 to-purple-600 opacity-20 -z-10 transform rotate-12"
    />
    <div
      style={{
        clipPath:
          'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)',
      }}
      className="fixed top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-emerald-400 to-cyan-500 opacity-20 -z-10 transform -rotate-12"
    />
    <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto p-4">
      <div className="relative text-center mb-16 w-full">
        <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-75 blur-3xl -z-10"></span>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-2">
          About Us
        </h1>
        <p className="mt-6 text-xl max-w-3xl mx-auto leading-relaxed">
          Empowering communities through direct <span className="font-semibold text-indigo-500 dark:text-indigo-400">hyperlocal support</span> and <span className="font-semibold text-pink-500 dark:text-pink-400">charity networking</span>.
        </p>
      </div>
      <div className="w-full max-w-4xl mb-16 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Our Story</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2">
            <p className="text-lg leading-relaxed">
              Founded in 2022 by a group of passionate social entrepreneurs, our journey began with a simple observation: while many want to help their communities, they often lack direct channels to those in need.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              What started as a small WhatsApp group connecting donors with local shelters has grown into a nationwide movement with over <span className="font-semibold text-indigo-500 dark:text-indigo-400">10,000 volunteers</span> across India.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold shadow-lg">
              2022
            </div>
          </div>
        </div>
      </div>
        <div className="w-full max-w-4xl mb-16 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Take the Pledge
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
            <p className="text-lg leading-relaxed">
                Every year, thousands of lives can be saved through the gift of organ donation. By pledging to be an organ donor, you can give the ultimate gift – the gift of life.
            </p>
            <p className="text-lg leading-relaxed mt-4">
                Join our movement and be part of a cause that truly makes a difference. Your pledge can bring hope to those in need of <span className="font-semibold text-indigo-500 dark:text-indigo-400">heart, kidney, liver, and eye transplants</span>.
            </p>
            <div className="mt-6">
                <button variant="outline" className="px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300">
                Pledge Now
                </button>
            </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-green-500 to-teal-600 flex items-center justify-center text-white text-xl font-bold text-center shadow-lg p-4">
                "I Pledge to Donate My Organs & Save Lives"
            </div>
            </div>
        </div>
        </div>
        <div className="w-full max-w-4xl mb-16 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Our Mission
        </h2>
        <p className="text-lg leading-relaxed">
            We believe in the <span className="font-semibold text-indigo-500 dark:text-indigo-400">gift of life</span> and the power of giving.  
            Through <span className="font-semibold text-pink-500 dark:text-pink-400">organ donation, blood donation, and eye donation</span>,  
            we connect selfless donors with those in urgent need, offering a second chance at life.  
            Our mission is to spread awareness, simplify the donation process, and create a world where  
            <span className="font-semibold text-indigo-500 dark:text-indigo-400">every life matters</span>.  
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <div className="text-4xl mb-2">🤝</div>
            <div className="font-semibold text-center">Community First</div>
          </div>
          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <div className="text-4xl mb-2">⚡</div>
            <div className="font-semibold text-center">Rapid Response</div>
          </div>
          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <div className="text-4xl mb-2">🔍</div>
            <div className="font-semibold text-center">Transparency</div>
          </div>
          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <div className="text-4xl mb-2">🌱</div>
            <div className="font-semibold text-center">Sustainable Help</div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-5xl mb-16">
  <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
    Our Impact
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
      <div className="text-4xl mb-4">🩸</div>
      <h3 className="text-2xl font-bold mb-3 text-red-600 dark:text-red-400">Blood Donation Drives</h3>
      <p className="text-lg leading-relaxed">
        Over <span className="font-semibold text-pink-500 dark:text-pink-400">10,000+ units</span> of blood have been donated across <span className="font-semibold">Delhi, Mumbai & Bangalore</span>, saving thousands of lives.
      </p>
      <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div className="bg-red-600 h-2.5 rounded-full w-4/5"></div>
      </div>
      <div className="mt-2 text-sm text-right">80% of our 2024 goal</div>
    </div>
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
      <div className="text-4xl mb-4">💚</div>
      <h3 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">Organ Donation Awareness</h3>
      <p className="text-lg leading-relaxed">
        Through our campaigns, <span className="font-semibold text-pink-500 dark:text-pink-400">5,000+ people</span> have pledged to donate organs, offering a second chance at life.
      </p>
      <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div className="bg-green-600 h-2.5 rounded-full w-3/4"></div>
      </div>
      <div className="mt-2 text-sm text-right">75% of our 2024 goal</div>
    </div>
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
      <div className="text-4xl mb-4">👁️</div>
      <h3 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Eye Donation Drives</h3>
      <p className="text-lg leading-relaxed">
        With the help of volunteers, we have facilitated <span className="font-semibold text-pink-500 dark:text-pink-400">2,000+ eye donations</span>, restoring vision for those in need.
      </p>
      <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full w-2/3"></div>
      </div>
      <div className="mt-2 text-sm text-right">67% of our 2024 goal</div>
    </div>
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
      <div className="text-4xl mb-4">🧬</div>
      <h3 className="text-2xl font-bold mb-3 text-purple-600 dark:text-purple-400">Plasma Therapy Support</h3>
      <p className="text-lg leading-relaxed">
        Our platform has connected <span className="font-semibold text-pink-500 dark:text-pink-400">1,500+ recovered patients</span> with plasma recipients for critical treatments.
      </p>
      <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div className="bg-purple-600 h-2.5 rounded-full w-1/2"></div>
      </div>
      <div className="mt-2 text-sm text-right">50% of our 2024 goal</div>
    </div>
    </div>
    </div>
      <div className="w-full max-w-5xl mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Priya Sharma", role: "Founder & CEO", emoji: "👩🏽‍💼" },
            { name: "Rahul Verma", role: "Operations Director", emoji: "👨🏽‍💻" },
            { name: "Ananya Patel", role: "Community Lead", emoji: "👩🏽‍🔧" },
            { name: "Vikram Singh", role: "Tech Lead", emoji: "👨🏽‍🔬" }
          ].map((member, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center transform transition-transform hover:scale-105">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center text-4xl mb-4">
                {member.emoji}
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-indigo-500 dark:text-indigo-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-4xl mb-16 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Testimonials</h2>
        <div className="space-y-8">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xl mr-4">R</div>
              <div>
                <h3 className="font-bold">Ravi Malhotra</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Volunteer, Mumbai</p>
              </div>
              <div className="ml-auto text-yellow-500">★★★★★</div>
            </div>
            <p className="italic">"I've been volunteering for 6 months, and the platform makes it incredibly easy to find where my skills are needed most. The impact tracking helps me see the real difference we're making."</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white text-xl mr-4">S</div>
              <div>
                <h3 className="font-bold">Sunita Desai</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">NGO Partner, Delhi</p>
              </div>
              <div className="ml-auto text-yellow-500">★★★★★</div>
            </div>
            <p className="italic">"The technology platform has transformed how we connect with donors. We now receive consistent support for our education programs and can focus more on teaching rather than fundraising."</p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl mb-16 p-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Movement</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Be a part of something greater! Whether you <span className="font-semibold underline decoration-pink-500 decoration-2 underline-offset-2">volunteer</span>, <span className="font-semibold underline decoration-pink-500 decoration-2 underline-offset-2">donate</span>, or <span className="font-semibold underline decoration-pink-500 decoration-2 underline-offset-2">spread awareness</span>, your impact matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-lg shadow-md hover:scale-105 transition">
              Volunteer Now
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-lg rounded-lg shadow-md hover:scale-105 transition">
              Donate
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-3xl mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Stay Updated</h2>
          <p className="text-center mb-6">Subscribe to our newsletter for impact stories and volunteer opportunities.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <footer className="w-full py-8 border-t border-gray-200 dark:border-gray-800 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          {[<FaTwitter />, <FaFacebook />, <FaInstagram />, <SiGmail />].map((icon, index) => (
            <a key={index} href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-700 transition">
              {icon}
            </a>
          ))}
        </div>
        <p>© 2025 Community Connect. All rights reserved.</p>
      </footer>
    </div>
</div>
  );
}

export default About_page;
