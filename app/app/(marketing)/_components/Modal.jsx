"use client"
import React, { useState } from 'react';

function Modal({ onClose }) {
  const [noteName, setNoteName] = useState('');

  const handleChange = (e) => {
    setNoteName(e.target.value);
  };
  
  const handleCreate = async () => {
    try {
      const response = await fetch("/api/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: noteName }),
      });
      console.log(response)
      if (response.ok) {
        console.log("New note created successfully");
        onClose(); 
      } else {
        console.error("Failed to create new note:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating new note:", error);
    }
  };
  /////////////////////////////////////////////////////////////////////
  return (
    <div className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow max-w-lg w-full mx-4 md:mx-auto">
        <div className="p-4 md:p-5 border-b border-gray-200">
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center focus:outline-none" onClick={onClose}>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">NEW NOTE</h3>
          <p className="text-sm text-gray-700 text-center mb-4">You can create a new note by clicking on the button below</p>
        </div>
        <div className="p-4 md:p-5">
          <input
            type="text"
            value={noteName}
            onChange={handleChange}
            placeholder="Enter note name"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-4"
          />
        </div>
        <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
          <button type="button" className="text-grey bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2" onClick={handleCreate}>Create</button>
          <button type="button" className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

