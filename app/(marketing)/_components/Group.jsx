"use client";
import React from "react";
import Sticker from "./Sticker";

function Group({ notes, event }) {
  let colors = [
    "border-[#FEC971]",
    "border-[#FE9B72]",
    "border-[#B693FD]",
    "border-[#00D4FE]",
  ];
  return (
    <div
      className={` scrollbar  max-w-[100%]  h-[34rem] flex flex-col md:justify-center md:flex-row gap-2 md:gap-10 md:flex-wrap overflow-y-auto`}
    >
      {notes && notes.length > 0 ? (
        notes.map((note, index) => (
          <Sticker
            color={colors[Math.floor(Math.random() * colors.length)]}
            key={index}
            note={note}
            event={event}
          />
        ))
      ) : (
        <div>No notes available</div>
      )}
    </div>
  );
}

export default Group;
