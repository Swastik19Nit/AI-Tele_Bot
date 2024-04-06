// "use client"
// import React, { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import Group from '../../_components/Group';
// import CreateNoteDialog from '../../_components/createNoteDialog';
// import { getFetchInstance, toggleFetchInstance } from '@/utils/instance';


// const Trash = () => {
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
//         getFetchInstance(email,"getTrashedNotes")
//         .then(res=>{
//             const{notes}=res.data;
//             setNotes(notes);
//         });
//     }, [session, sessionStatus,trash,archive]);


//     return (
//         <div className='w-full flex flex-col gap-y-8 items-center p-5'>
//             <CreateNoteDialog />
//             <Group notes={notes} archived={false} trashed={true} event={event}/>
//         </div>
//     );
// };

// export default Trash;

"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Group from '../../_components/Group';
import CreateNoteDialog from '../../_components/createNoteDialog';
import { getFetchInstance, toggleFetchInstance } from '@/utils/instance';


const Trash = () => {
    const { data: session, status: sessionStatus } = useSession();
    const [notes, setNotes] = useState([]);
    const [trash, setTrash] = useState(false);
    const [del, setDel] = useState(false);
    const toggleTrash = async (noteId: String) => {
        const res = await toggleFetchInstance(noteId, "toggleTrash");
        setTrash(!trash);
    };
    const toggleDel = async (noteId: string) => {
        const res = await toggleFetchInstance(noteId, "toggleDel");
        setDel(!del);
    };
    const event = {
        toggleTrash: toggleTrash,
        toggleDel: toggleDel,
    }
    const email = session?.user?.email;

    useEffect(() => {
        getFetchInstance(email, "getTrashedNotes")
            .then(res => {
                const { notes } = res.data;
                setNotes(notes);
            });
    }, [session, sessionStatus, trash, del]);


    return (
        <div className='w-full flex bg-[#F8F6E9] flex-col gap-y-8 items-center p-5'>
            <CreateNoteDialog />
            <Group notes={notes} event={event} />
        </div>
    );
};

export default Trash;
