import React from "react";
import { Link } from "react-router-dom"; // IMPORT THIS to make links work
import useScrollReveal from "../hooks/useScrollReveal"; // Make sure you move your hook to src/hooks/

const servicesData = [
  {
    id: 1,
    title: "Car Boot Surprises",
    description:
      "Complete setup with lights, cake, and decor in your car trunk.",
    image: "/car_trunk.jpg",
    span: "col-span-1 md:col-span-2 md:row-span-2", // Converted to Tailwind classes
    link: "/category/car-surprises", // Added Link
  },
  {
    id: 2,
    title: "Custom Fits",
    description: "Printed hoodies & streetwear.",
    image: "/landing_page_apparel.jpg",
    span: "",
    link: "/category/custom-apparel",
  },
  {
    id: 3,
    title: "Resin Art",
    description: "Polaroid blocks & keepsakes.",
    image: "/resin_art.jpg",
    span: "",
    link: "/category/resin-hampers",
  },
  {
    id: 4,
    title: "Luxury Hampers",
    description: "Curated gift boxes for birthdays & corporate events.",
    image: "/gift_landing.jpg",
    span: "col-span-1 md:col-span-2",
    link: "/category/resin-hampers",
  },
];

const Services = () => {
  useScrollReveal();

  return (
    <section className="py-24 bg-bgDark" id="categories">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-display text-center mb-16 reveal">
          Curated Categories
        </h2>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-6">
          {servicesData.map((service) => (
            <Link
              to={service.link}
              key={service.id}
              className={`relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 reveal ${service.span}`}
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={service.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                  alt={service.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
