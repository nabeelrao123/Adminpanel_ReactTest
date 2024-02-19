import React from 'react'
import { FaPlus } from "react-icons/fa";


function AddCoutomerButton({setAddModal}) {
  return (
  
    <button onClick={()=> setAddModal(true)} className="border   bg-gradient-to-r from-[#57BC90] to-teal-900 rounded-md flex justify-center gap-6 items-center p-3 shadow-lg w-[220px] ">
      <div>
        <FaPlus className="text-[14px] text-white" />
      </div>
    
      <p className="text-[14px] text-white font-[500]">ADD NEW CUSTOMER</p>
    </button>
 
  )
}

export default AddCoutomerButton