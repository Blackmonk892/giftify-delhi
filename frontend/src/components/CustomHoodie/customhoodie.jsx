import React from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

const hoodiesData = [
  {
    id: 1,
    title: "Stay Chill Tee",
    price: "₹899",
    image: "/hoodie_list_4.jpeg",
  },
  {
    id: 2,
    title: "8 Mile to Nirvana Tee",
    price: "Starts ₹999",
    image: "/hoodie_list_5.jpeg",
  },
  {
    id: 3,
    title: "Rockstar Vibe Hoodie",
    price: "₹799",
    image: "/hoodie_list_2.jpeg",
  },
];

const CustomHoodie = () => {
  useScrollReveal();

  return (
    <section className="custom-hoodie" id="apparel">
      <div className="container">
        <h2 className="section-title reveal">Wear Your Vibe</h2>
        <p className="reveal" style={{ color: "var(--text-muted)" }}>
          From minimalist text to full-blown graphic prints. You imagine it, we
          print it.
        </p>

        <div className="hoodie-showcase">
          {hoodiesData.map((hoodie) => (
            <div key={hoodie.id} className="hoodie-card reveal">
              <div className="hoodie-img">
                <img src={hoodie.image} alt={hoodie.title} />
              </div>
              <h4>{hoodie.title}</h4>
              <p style={{ color: "var(--accent)" }}>{hoodie.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomHoodie;
