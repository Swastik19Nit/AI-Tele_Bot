// import React from 'react'
// import { getServerSession } from 'next-auth';
// import { redirect } from "next/navigation";
// import CreateNoteDialog from '../_components/createNoteDialog';
// import MinNav from "../_components/MinNav";
// import { FaPencilAlt } from "react-icons/fa";

// const Dashboard = () => {

//   const session = getServerSession();
//   if (!session) {
//     console.log(session)
//     redirect('/');
//   }
//   return (
//     <>

//       <div className="w-full h-screen flex flex-col gap-y-8 pl-[15rem] pt-[5rem]">
//         {/* <MinNav data={true} /> */}
//         <MinNav data={false} />
//         <div
//           style={{
//             position: "fixed",
//             bottom: "20px",
//             right: "20px",
//             zIndex: "2",
//           }}
//         >
//           <button
//             className="btn btn-primary d-flex align-items-center"
//             style={{
//               backgroundColor: "blue",
//               color: "white",
//               padding: "20px 40px",
//               border: "none",
//               borderRadius: "10px",
//               cursor: "pointer",
//               display: "flex",
//             }}
//           >
//             <span style={{ paddingRight: "10px" }}>New Note</span>
//             <FaPencilAlt size={'1.5em'} className='cursor-pointer' />
//           </button>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Dashboard

"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Group from '../_components/Group';
import MinNav from "../_components/MinNav";

const Dashboard = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [notes, setNotes] = useState([]);


  useEffect(() => {
    const fetchNotes = async () => {
      try {
          if (sessionStatus === 'authenticated') {
              console.log(session);
              console.log(sessionStatus)
              const response = await fetch(`/api/note`, {
                  method: "GET", 
                  headers: {
                      "Content-Type": "application/json",
                  },
              });
              if (response.ok) {
                  const data = await response.json();
                  console.log(data);
                  setNotes(data.notes);
              } else {
                  console.error('Failed to fetch notes:', response.statusText);
              }
          }
      } catch (error) {
          console.error('Error fetching notes:', error);
      }
  };
  
    fetchNotes();
  }, [session, sessionStatus]);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <MinNav data={false} />
      <div className="max-w-screen-lg w-full">

        <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
        <Group notes={notes} />
      </div>
    </div>
  );
};

export default Dashboard;
