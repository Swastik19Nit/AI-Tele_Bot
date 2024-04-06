"use client"
import React from 'react';
import { FaFile } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

function Folder() {
  return (
    <div className='w-56 h-36 px-3 py-4 relative flex flex-col  gap-4 bg-[#e8a4a0d1]  rounded-xl hover:shadow-2xl hover:shadow-[#f3aba8d1]' >
      <div className='flex justify-between items-center'> 
        <FaFile className='text-[#c95049]' size={"2em"} />
        <BsThreeDots className="cursor-pointer" size={"1.5em"} />
      </div>
      <h2 className='text-lg font-bold font-sans'>Class Notes</h2>
      <h4 className='text-xs'>12/11/24</h4>
      <Modal/>
    </div>
  );
}

export default Folder;
