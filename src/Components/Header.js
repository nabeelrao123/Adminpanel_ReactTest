import React from 'react';
import { CiMenuBurger } from "react-icons/ci";

const Header = ({setSidebar={setSidebar}}) => {
  return (
    <header className="bg-white text-white py-4 pl-[60px] shadow-md">
      <div className='text-black md:hidden block' onClick={() => setSidebar(true)}>
        <CiMenuBurger />
      </div>
      <h1 className="text-[30px] font-[700] text-black">CUSTOMERS</h1>
      {/* Add your header content here */}
    </header>
  );
};

export default Header;
