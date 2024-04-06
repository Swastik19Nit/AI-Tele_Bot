import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { MdOutlineTimer } from 'react-icons/md';
import { IoMdArchive } from 'react-icons/io';
import { FaTrash } from 'react-icons/fa';
import { RiInboxUnarchiveFill } from 'react-icons/ri';
import { HiOutlineArrowUturnLeft } from "react-icons/hi2";
import Modale from './Modale';

function Sticker({note ,event,color}) {
  const {toggleArchive,toggleTrash,toggleDel}=event;
  const{title, trashed, archived,imageUrl}=note;
  const noteId=note._id;
  const date=note.updated_date;
  const [showModal, setShowModal] = useState(false);
  const dateObj = new Date(date);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const dat = dateObj.toLocaleDateString("en-US", options);
  const [hour, min] = date.split("T")[1].split(":");
  const day = dateObj.toLocaleDateString("en-US", { weekday: "short" });
  const toggleModal = () => {
    setShowModal(!showModal);
  }; 

  console.log(imageUrl);

  return (
    <>
      <div className={`w-full md:w-60 md:h-[16rem] px-2 py-4 relative flex  md:flex-col gap-2 bg-[#D9F47B]  rounded-lg hover:shadow-md border-4 border-solid ${color} hover:shadow-xl transition hover:translate-y-1  hover:-translate-x-1 `}>
        <h4 className="text-xs">{dat}</h4>
        <div className="flex justify-between items-center">
          <h2 className="md:text-lg truncate w-48 font-semibold">{title}</h2>
          <FaPencilAlt
            size={"1em"}
            className="cursor-pointer"
            onClick={toggleModal}
          />
        </div>
        <img
          src={imageUrl}
          alt="Thumbnail"
          className="hidden md:block bottom-10 h-32 w-56 rounded-lg"
        />
        <div className="flex items-center justify-between ">
          <div className=" hidden md:flex  items-center gap-x-5">
            <MdOutlineTimer size={"1.3em"} />
            <h5 className="text-xs text-gray-600">{`${
              hour > 12 ? hour - 12 : hour
            }:${min} ${hour > 12 ? "PM" : "AM"}, ${day}`}</h5>
          </div>
          <div className="flex items-center gap-x-5 ">
            {trashed ? <FaTrash className="text-[#a83434] cursor-pointer" onClick={()=>toggleDel(noteId)}/> : archived ?<RiInboxUnarchiveFill className="hover:cursor-pointer" onClick={()=>toggleArchive(noteId)} />: <IoMdArchive  className="hover:cursor-pointer" onClick={()=> toggleArchive(noteId)} />}
            {trashed ? < HiOutlineArrowUturnLeft  className="hover:cursor-pointer" onClick={()=>toggleTrash(noteId)}/> : <FaTrash  className="hover:cursor-pointer" onClick={async ()=>await toggleTrash(noteId)}/>}
          </div>
        </div>
      </div>
      {showModal && <Modale onClose={toggleModal} title={title} noteId={noteId} imageUrl={imageUrl} />}
    </>
  );
}

export default Sticker;