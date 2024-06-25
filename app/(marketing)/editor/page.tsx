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

  return (
    <>
      {editorState === "editor" ? <NoteEditor /> : <PublishForm />} 
    </>
  );
};

export default Editor;