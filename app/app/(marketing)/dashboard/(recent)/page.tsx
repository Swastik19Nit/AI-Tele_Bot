"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Group from '../../_components/Group';
import CreateNoteDialog from '../../_components/createNoteDialog';
import User from '@/modals/User';
import { getFetchInstance,toggleFetchInstance } from '@/utils/instance';


const Dashboard = () => {
    const { data: session, status: sessionStatus } = useSession();
    const [notes, setNotes] = useState([]);
    const [trash,setTrash]=useState(false);
    const [archive,setArchive]=useState(false);
    const [create,setCreate]=useState(false);
    const email=session?.user?.email;
    const toggleTrash =async (noteId:String) => {
        console.log(noteId);
        const res =await toggleFetchInstance(noteId,"toggleTrash");
        setTrash(!trash);
      };
    const toggleArchive = async (noteId:String) => {
        console.log(noteId);
        const res = await toggleFetchInstance(noteId,"toggleArchive");
        setArchive(!archive);
      };
    const event={
        toggleTrash: toggleTrash,
        toggleArchive: toggleArchive,
    }
    useEffect(() => {
        getFetchInstance(email,"getRecentNotes")
        .then(res=>{
            const{notes}=res.data;
            setNotes(notes);
        });
    }, [session, sessionStatus,trash,create,archive]);

    return (
        <div className='w-full flex flex-col gap-y-8 items-center p-5'>
            <CreateNoteDialog  />
            <Group notes={notes} archived={false} trashed={false} event={event}/>
        </div>
    );
};

export default Dashboard;
