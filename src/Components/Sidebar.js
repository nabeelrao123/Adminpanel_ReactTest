import React from "react";
import logo from "../images/logo.png";
import { HiUserGroup } from "react-icons/hi2";

const Sidebar = () => {
  return (
    <div className=" bg-[#015249] text-white p-4 h-screen rounded-r-[10px] ">
      
      <img src={logo} className="w-[200px] h-[40px] object-contain" />

      <div className="border border-[#043933] bg-[#043933] rounded-md flex justify-center md:gap-6 gap-1 items-center p-1  mt-[80px] shadow-md">
        <div>
          <HiUserGroup className="lg:text-[18px] text-[12px]"/>
        </div>
        <p className="lg:text-[18px] text-[12px] text-white font-[500]">CUSTOMERS</p>
      </div>
    </div>
  );
};

export default Sidebar;
