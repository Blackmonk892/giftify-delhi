import React from "react";
// Ensure these paths match where you actually put the files!
import Hero from "../components/Hero/hero.jsx";
import Services from "../components/Services.jsx";
import CarSpotlight from "../components/CarSpotlight/carspotlight.jsx";
import CustomHoodie from "../components/CustomHoodie/customhoodie.jsx";
import About from "../components/About/about.jsx";
import Footer from "../components/Footer/footer.jsx";

const HomePage = () => {
  return (
    <div className="landing-page-wrapper">
      <Hero />
      <Services />
      <CarSpotlight />
      <CustomHoodie />
      <About />
      <Footer />
    </div>
  );
};

export default HomePage;
