"use client"
import React, { useEffect,useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EditorJS from '@editorjs/editorjs';
import NoteEditor from '@/app/(marketing)/_components/editor';
import PublishForm from '@/app/(marketing)/_components/publish';
// const blogStructure = {
//   title:'',
//   content:[],
//   author:{user_id:{}}
// }

const Editor = () => {
  // const [note,setNote]=useState(blogStructure)
  const [editorState, setEditorState] = useState("editor");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      return; 
    }

    if (!session) {
      router.push('/');
    }
  }, [session, status, router]);
//
  return (
    <>
      <div className='bg-[url(https://images.unsplash.com/photo-1611079830811-865ff4428d17?q=80&w=1834&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center min-h-full '
      style={{ backgroundSize: '210%' }}>
      {editorState === "editor" ? <NoteEditor /> : <PublishForm />} 
      </div>
    </>
  );
};

export default Editor;