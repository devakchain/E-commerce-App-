import React from "react";

import "../style/HomePage.css";
import HeroSection from "./HeroSection";
import iphone from "../../public/iphone.webp";
import mac from "../../public/mac.webp";
import FeaturedProduct from "./FeaturedProduct";

function HomePage() {
  return (
    <div>
      <HeroSection
        title="Buy iPhone 14 pro"
        subtitle="Experience next-level performance – Get your iPhone 14 Pro today!"
        link="http://localhost:5173/products/product/684555c44d29ddcb1090a8b8"
        image={iphone}
      />
      <FeaturedProduct />
      <HeroSection
        title="Buy Your Mac"
        subtitle="Mac — Power. Style. No Limits."
        link="http://localhost:5173/products/product/684555c44d29ddcb1090a8c0"
        image={mac}
      />
    </div>
  );
}

export default HomePage;
