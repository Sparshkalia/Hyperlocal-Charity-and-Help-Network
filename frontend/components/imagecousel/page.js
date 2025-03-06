"use client";
import { useEffect, useRef, useState } from "react";

function ImageCarousel() {
  const scrollRef = useRef(null);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const slideData = [
      { image: "/bdonation.png", title: "Donate Blood, Save Lives", description: "Your donation can give someone a second chance at life." },
      { image: "/odonation.png", title: "Be the Change", description: "Join volunteer programs and make a difference in your community." },
      { image: "/nss.png", title: "NSS - Not Me, But You", description: "Serve the nation through social service and uplift lives." },
      { image: "/kind.png", title: "Every Act of Kindness Matters", description: "Charity is not about giving, it’s about making an impact." },
      { image: "/camps.png", title: "Health Camps for All", description: "Providing medical assistance to the underprivileged." },
    ];
    setSlides([...slideData, ...slideData]); // Duplicate slides for infinite scrolling
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-8 px-4">
      <div
        ref={scrollRef}
        className="flex space-x-4 animate-scroll"
        onMouseEnter={() => scrollRef.current.style.animationPlayState = "paused"}
        onMouseLeave={() => scrollRef.current.style.animationPlayState = "running"}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative flex-shrink-0 snap-center">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full sm:w-[500px] md:w-[600px] lg:w-[750px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 bg-black bg-opacity-40 backdrop-blur-md p-3 sm:p-4 rounded-lg text-white text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{slide.title}</h2>
              <p className="text-xs sm:text-sm mt-1 sm:mt-2">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Moves half since we duplicated slides */
        }

        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 15s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default ImageCarousel;
