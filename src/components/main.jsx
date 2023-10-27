import React, { useEffect, useState } from "react";
import image1 from '../assets/shop our huge Diwali sale now shop our huge Diwali sale now shop our huge Diwali sale now.png'
import image2 from '../assets/Untitled design.png'

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    image1,
    image2
  ];
  useEffect(() => {
    // Set up a timer to change the image at an interval (e.g., every 3 seconds)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // 4000 milliseconds (3 seconds)

    return () => {
      // Cleanup when the component unmounts
      clearInterval(interval);
    };
  }, [images.length]);
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3 inset">
          <img
            src={images[currentImageIndex]}
            className="card-img"
            alt="..."
          />
        </div>
      </div>
    </>
  );
};

export default Home;
