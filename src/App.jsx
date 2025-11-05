import { useState } from "react";
import Home from "./pages/Home";
import pageData from "./json/pages.json";

const App = () => {
  const [index, setIndex] = useState(0);
  const data = pageData;

  const next = () => setIndex((index + 1) % data.length);
  const prev = () => setIndex((index - 1 + data.length) % data.length);

  return (
    <div className="relative">
      <Home val={data[index]} />

      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-10000 flex gap-4">
        <button
          onClick={prev}
          className="px-6 py-3 bg-[#b70add] text-white border-none rounded-md cursor-pointer text-lg font-bold hover:bg-[#a10ac8] transition-colors duration-200"
        >
          Previous
        </button>
        <button
          onClick={next}
          className="px-6 py-3 bg-[#b70add] text-white border-none rounded-md cursor-pointer text-lg font-bold hover:bg-[#a10ac8] transition-colors duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
  // return (
  //   <>
  //     <Home />
  //   </>
  // );
};

export default App;
