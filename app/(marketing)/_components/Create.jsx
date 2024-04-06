"use client"
import React from 'react'
import { FaFile } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";

function Create(props) {
  
  const { data } = props;
  return (
    <>
      <div className='w-32 h-32 flex flex-col gap-2 justify-center items-center rounded-2xl border-dashed border-gray-400 border-4 cursor-pointer'>
        {data ? <FaFile size={'2em'} /> : <FaPencilAlt size={'1.5em'} />}
        <h2 className='text-lg text-gray-500 font-bold font-sans'>New {data ? 'Folder' : 'Notes'}</h2>
      </div>

    </>

  )
}

export default Create