"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Group from '../../_components/Group';
import SearchBar from '../../_components/Search';
import CreateNoteDialog from '../../_components/createNoteDialog';
import { getFetchInstance, toggleFetchInstance } from '@/utils/instance';

const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const Dashboard = () => {
    const { data: session, status: sessionStatus } = useSession();
    const [notes, setNotes] = useState([]);
    const [trash, setTrash] = useState(false);
    const [archive, setArchive] = useState(false);
    const [create, setCreate] = useState(false);
    const [title, setTitle] = useState("");
    const email = session?.user?.email;

    const toggleTrash = async (noteId: String) => {
        const res = await toggleFetchInstance(noteId, "toggleTrash");
        setTrash(!trash);
    };

    const toggleArchive = async (noteId: String) => {
        const res = await toggleFetchInstance(noteId, "toggleArchive");
        setArchive(!archive);
    };

    const event = {
        toggleTrash: toggleTrash,
        toggleArchive: toggleArchive,
        setCreate: setCreate,
    }
    const search= async(title:string) => {
        setTitle(title);
    }
    const searchTitle = debounce(search, 500);
    useEffect(() => {
        if(title.trim()==""){
        getFetchInstance(email,"getRecentNotes")
            .then(res => {
                const { notes } = res.data;
                setNotes(notes);
            });
        }else{
            getFetchInstance(email,"search",title)
            .then(res => {
                const { notes } = res.data;
                setNotes(notes);
            });
        }    
    }, [sessionStatus,trash, create, session,archive,title]);

    return (
        <div className='w-full flex flex-col gap-y-8  bg-[#F8F6E9] items-center p-5'>
            <SearchBar searchTitle={searchTitle} />
            <CreateNoteDialog setCreate={setCreate}/>
            <Group notes={notes} event={event} />
        </div>
    );
};

export default Dashboard;
