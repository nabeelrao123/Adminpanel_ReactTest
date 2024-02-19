import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Customer from "./pages/Customer";

const App = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <Router>
      <div className="grid grid-cols-6 ">
        <div className="lg:col-span-1 md:col-span-2 xs:col-span-1 hidden md:block ">
          <Sidebar setSidebar={setSidebar} sidebar={sidebar} />
        </div>

        {sidebar && (
          <div className=" md:hidden  ">
            <div className="h-screen w-screen fixed " onClick={() => setSidebar(false)}>
              <div className="fixed" onClick={(e) => e.stopPropagation()}>
            <Sidebar setSidebar={setSidebar} sidebar={sidebar} />

              </div>

            </div>
          </div>
        )}

        <div className={`lg:col-span-5 md:col-span-4  col-span-6   bg-[#F3F3F3]  `}>
          <Header setSidebar={setSidebar} />
          <div className="">
            <Routes>
              <Route path="/" exact element={<Customer />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
