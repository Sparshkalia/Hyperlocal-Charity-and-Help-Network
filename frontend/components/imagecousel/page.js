"use client";
import { useEffect, useRef, useState } from "react";

function ImageCarousel() {
  const scrollRef = useRef(null);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const slideData = [
      {
        image: "/bdonation.png",
        title: "Donate Blood, Save Lives",
        description: "Your donation can give someone a second chance at life.",
      },
      {
        image: "/odonation.png",
        title: "Be the Change",
        description: "Join volunteer programs and make a difference in your community.",
      },
      {
        image: "/nss.png",
        title: "NSS - Not Me, But You",
        description: "Serve the nation through social service and uplift lives.",
      },
      {
        image: "/kind.png",
        title: "Every Act of Kindness Matters",
        description: "Charity is not about giving, it’s about making an impact.",
      },
      {
        image: "/camps.png",
        title: "Health Camps for All",
        description: "Providing medical assistance to the underprivileged.",
      },
    ];
    setSlides(slideData);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval;

    if (scrollContainer) {
      scrollInterval = setInterval(() => {
        scrollContainer.scrollBy({
          left: scrollContainer.offsetWidth,
          behavior: "smooth",
        });

        if (
          scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }, 3000);
    }

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="w-full overflow-hidden py-8 px-4">
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-scroll no-scrollbar snap-x snap-mandatory"
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative snap-center flex-shrink-0">
            {/* Image (Responsive Sizes) */}
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full sm:w-[500px] md:w-[600px] lg:w-[750px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover rounded-2xl shadow-lg"
            />

            {/* Text Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 bg-black bg-opacity-40 backdrop-blur-md p-3 sm:p-4 rounded-lg text-white text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{slide.title}</h2>
              <p className="text-xs sm:text-sm mt-1 sm:mt-2">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default ImageCarousel;
