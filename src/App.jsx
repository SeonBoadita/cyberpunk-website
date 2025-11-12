import { useState } from "react";
import Home from "./pages/Home";
import pageData from "./json/pages.json";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"

const App = () => {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(0);
  const data = pageData;

  gsap.registerPlugin(ScrollTrigger)
  const selectedPage = (e) => {
    setIndex(e);
  };

  const next = () => setDisplay((display + 1) % data.length);
  const prev = () => setDisplay((display - 1 + data.length) % data.length);


  useGSAP(() => {
    gsap.to(".bottom-fixed-container", {
      y: 500,
      delay: 1,
      duration: 1,
      scrollTrigger: {
        trigger: ".main-div",
        start: "top+=200vh top",
        end: "top+=700vh top",
        markers: true,
        scrub: {
          amount: 0.5
        }
      }
    })
  })

  return (
    <div className="main-div relative">
      <Home val={data[index]} />

      {/* Fixed bottom container */}
      <div className="bottom-fixed-container w-[25vw] h-[32vh] rounded-[10px] overflow-hidden fixed bottom-[3vh] right-[3vw] z-50 flex justify-center items-end">
        <div className="nav-container bg-transparent relative w-full h-full overflow-hidden flex items-center justify-between">

          {/* Arrows */}
          <div
            className="left-arrow absolute left-2 cursor-pointer text-3xl z-10 select-none"
            onClick={prev}
          >
            <i className="fa-solid fa-circle-chevron-left"></i>
          </div>

          {/* Slider divs */}
          <div
            className="flex transition-transform duration-500 ease-out w-full h-full"
            style={{
              transform: `translateX(-${display * 100}%)`,
              width: `${data.length * 100}%`,
            }}
          >
            {data.map((value, i) => (
              <div
                key={i}
                className="one relative w-full h-full shrink-0"
                onClick={() => selectedPage(i)}
              >
                <img className="nav-image object-cover w-full h-full" src={`src/assets/images/nav-images/BG${i}.png`} alt="" />
              </div>
            ))}
          </div>

          <div
            className="right-arrow absolute right-2 cursor-pointer text-3xl z-10 select-none"
            onClick={next}
          >
            <i className="fa-solid fa-circle-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
