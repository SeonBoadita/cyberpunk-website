import { useState } from "react";
import Home from "./pages/Home";
import pageData from "./json/pages.json";
import gsap from "gsap";

const App = () => {
  const [index, setIndex] = useState(0);
  const data = pageData;

  const next = () => setIndex((index + 1) % data.length);
  const prev = () => setIndex((index - 1 + data.length) % data.length);

  // Expand div upward + animate buttons from bottom
  const expandDiv = () => {
    gsap.to(".bottom-fixed-container", {
      height: "16vh", // expands upward
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(".bottom-text", {
      y: -200,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.fromTo(
      ".nav-buttons",
      { y: 30, opacity: 0, display: "none" },
      { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: "power2.out", display: "flex" }
    );
  };

  // Shrink back down
  const normalDiv = () => {
    gsap.to(".bottom-fixed-container", {
      height: "4.5vh",
      duration: 0.4,
      ease: "power2.inOut",
    });

    gsap.to(".bottom-text", {
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(".nav-buttons", {
      y: 30,
      opacity: 0,
      display: "none",
      duration: 0.3,
      ease: "power1.in",
    });
  };

  return (
    <div className="relative">
      <Home val={data[index]} />

      {/* Fixed bottom container */}
      <div
        className="bottom-fixed-container w-full h-[4.5vh] fixed bottom-0 left-0 bg-[#ffd8fd] border-[#f0d] border-t z-50 overflow-hidden flex justify-center items-end"
        onMouseEnter={expandDiv}
        onMouseLeave={normalDiv}
      >
        <div className="bottom-text">Explore More</div>
        {/* Button container */}
        <div className="nav-buttons flex gap-6 mb-2 opacity-0 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={prev}
            className="px-6 py-2 bg-[#b70add] text-white border-none rounded-md cursor-pointer text-lg font-bold hover:bg-[#a10ac8] transition-colors duration-200"
            style={{ padding: "3px" }}
          >
            Previous
          </button>
          <button
            onClick={next}
            className="px-6 py-2 bg-[#b70add] text-white border-none rounded-md cursor-pointer text-lg font-bold hover:bg-[#a10ac8] transition-colors duration-200"
            style={{ padding: "3px" }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
