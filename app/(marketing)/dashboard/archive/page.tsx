// "use client"
// import React, { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import Group from '../../_components/Group';
// import CreateNoteDialog from '../../_components/createNoteDialog';
// import { getFetchInstance, toggleFetchInstance } from '@/utils/instance';


// const Archive = () => {
//     const { data: session, status: sessionStatus } = useSession();
//     const [notes, setNotes] = useState([]);
//     const [trash,setTrash]=useState(false);
//     const [archive,setArchive]=useState(false);
//     const toggleTrash =async (noteId:String) => {
//         console.log(noteId);
//         const res =await toggleFetchInstance(noteId,"toggleTrash");
//         setTrash(!trash);
//       };
//     const toggleArchive = async (noteId:String) => {
//         console.log(noteId);
//         const res = await toggleFetchInstance(noteId,"toggleArchive");
//         setArchive(!archive);
//       };
//     const event={
//         toggleTrash: toggleTrash,
//         toggleArchive: toggleArchive,
//     }
//     const email=session?.user.email;
//     useEffect(() => {
//         getFetchInstance(email,"getArchivedNotes")
//         .then(res=>{
//             const{notes}=res.data;
//             setNotes(notes);
//         });
//     }, [session, sessionStatus,trash,archive]);
        

//     return (
//         <div className='w-full flex flex-col gap-y-8 items-center p-5'>
//             <CreateNoteDialog />
//             <Group notes={notes} archived={true} trashed={false} event={event}/>
//         </div>



//     );
// };

// export default Archive;

"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Group from '../../_components/Group';
import CreateNoteDialog from '../../_components/createNoteDialog';
import { getFetchInstance, toggleFetchInstance } from '@/utils/instance';


const Archive = () => {
    const { data: session, status: sessionStatus } = useSession();
    const [notes, setNotes] = useState([]);
    const [trash,setTrash]=useState(false);
    const [archive,setArchive]=useState(false);
    const toggleTrash =async (noteId:String) => {
        const res =await toggleFetchInstance(noteId,"toggleTrash");
        setTrash(!trash);
      };
    const toggleArchive = async (noteId:String) => {
        const res = await toggleFetchInstance(noteId,"toggleArchive");
        setArchive(!archive);
      };
    const event={
        toggleTrash: toggleTrash,
        toggleArchive: toggleArchive,
    }
    const email=session?.user?.email;
    useEffect(() => {
        getFetchInstance(email,"getArchivedNotes")
        .then(res=>{
            const{notes}=res.data;
            setNotes(notes);
        });
    }, [session, sessionStatus,trash,archive]);
        

    return (
        <div className='w-full flex flex-col gap-y-8 bg-[#F8F6E9] items-center p-5'>
            <CreateNoteDialog />
            <Group notes={notes}  event={event}/>
        </div>



    );
};

export default Archive;
