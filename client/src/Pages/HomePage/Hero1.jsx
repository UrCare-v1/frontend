import React, { useState, useEffect } from "react";
import logo from "/images/logo-without-bg.png";
import user1 from "/images/logo.JPG";
import user2 from "/images/logo.JPG";
import user3 from "/images/logo.JPG";
import user4 from "/images/logo.JPG";
import user5 from "/images/logo.JPG";
import user6 from "/images/logo.JPG";
import calendar from "/images/logo.JPG";
import globe from "/images/logo.JPG";
import party from "/images/logo.JPG";
import pin from "/images/logo.JPG";

const images = [
  user1,
  user2,
  user3,
  user4,
  calendar,
  globe,
  pin,
  user5,
  user6,
  party,
];

const Hero1 = () => {
  const [radii, setRadii] = useState([100, 180, 260]);
  const [iconOffset, setIconOffset] = useState(2.5);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setRadii([160, 260, 360]);
        setIconOffset(2.5);
      } else if (width >= 768) {
        setRadii([100, 180, 260]);
        setIconOffset(2.5);
      } else {
        setRadii([60, 120, 170]);
        setIconOffset(1.75);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const generateCircle = (radius, offset, imageSet) => {
    const angleStep = (2 * Math.PI) / imageSet.length;

    return imageSet.map((src, i) => {
      const angle = angleStep * i + offset;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      return (
        <img
          key={i}
          src={src}
          alt={`img-${i}`}
          className="absolute w-12 h-12  md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg object-cover"
          style={{
            top: `calc(50% + ${y}px - ${iconOffset}rem)`,
            left: `calc(50% + ${x}px - ${iconOffset}rem)`,
          }}
        />
      );
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] overflow-hidden">
      <div className="relative w-[90vw] max-w-[700px] h-[90vw] max-h-[700px]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          <img
            src={logo}
            alt="Center Logo"
            className="w-20 h-20 md:w-36 md:h-36"
          />
        </div>

        {radii.map((r, i) => (
          <div
            key={i}
            className="absolute border border-gray-300 rounded-full"
            style={{
              width: `${2 * r}px`,
              height: `${2 * r}px`,
              top: `calc(50% - ${r}px)`,
              left: `calc(50% - ${r}px)`,
            }}
          />
        ))}

        {/* Images on the circles */}
        {generateCircle(radii[0], 0, images.slice(0, 3))}
        {generateCircle(radii[1], 0.5, images.slice(3, 6))}
        {generateCircle(radii[2], 1, images.slice(6))}
      </div>

      <div className="mt-12 text-center">
        <p className="!text-3xl sm:!text-5xl font-bold heading-font mb-2 ">
          Track your Health{" "}
        </p>
        <p className="heading-font text-3xl sm:text-4xl font-bold  ">Now</p>
      </div>

      <div className="mt-6">
        <button className="button">Get Started</button>
      </div>
    </div>
  );
};

export default Hero1;
