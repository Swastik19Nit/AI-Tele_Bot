import React, { useEffect, useContext, useRef } from 'react';
import { EditorContext } from '@/components/EditorContext';
import { useSearchParams } from 'next/navigation';
import { toggleFetchInstance } from '@/utils/instance';

const NoteEditor = () => {
  const { initEditor } = useContext(EditorContext);
  const editorRef = useRef(null);
  const titleInputRef = useRef(null);
  const editorInstanceRef = useRef(null); 
  const searchParams = useSearchParams();
  const initialTitle = searchParams.get('title') || '';
  const initialBody = searchParams.get('body') || '';
  const noteId = searchParams.get('noteId') || '';


  useEffect(() => {
    if (!editorRef.current && initEditor) {
      const editor = initEditor();
      editorRef.current = true;
      toggleFetchInstance(noteId,"getNote")
      .then((res)=>{
      
      editorInstanceRef.current = editor; 
      const  {blocks}=res.note.content;
      editor.isReady
        .then(() => {

          const data = {
            time: new Date().getTime(),
            blocks: blocks,
          };
          editor.render(data);
        })
        .catch((err) => {
          console.error('Failed to render initial content:', err);
        });
      })
      
    }
  }, [initEditor, editorRef.current]);
  // , initialBody
  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
    e.preventDefault();
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleSave = () => {
    const editorInstance = editorInstanceRef.current;
    
    if (editorInstance) {
      editorInstance.save()
        .then((outputData) => {
          const requestBody = {
            noteId,
            newContent: outputData,
          };
  
          fetch('/api/content', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error('Failed to update content');
            }
          })
          .then((data) => {
            console.log(data.message);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        })
        .catch((err) => {
          console.error('Failed to save editor content:', err);
        });
    } else {
      console.log('No editor instance');
    }
  };

  const handleEditClick = (noteId) => {
    const newTitle = titleInputRef.current?.value || '';
    fetch('/api/title', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        noteId,
        newTitle,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to update title');
        }
      })
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'a' && event.ctrlKey) {
      console.log("hi");
    }
  };

  return (
    <div>
    <section >
    <div className="mx-auto max-w-[900px] w-full flex items-center">
        
        <textarea
          ref={titleInputRef}
          onKeyDown={handleTitleKeyDown}
          placeholder={initialTitle || 'Note Title'}
          className=" text-4xl font-medium w-[88%] h-20 outline-none resize-none leading-tight placeholder:opacity-40 mt-1 text-center bg-blue-100 p-4 justify-center ml-20"
          defaultValue={initialTitle || ''}
        />
      </div>
      <div className='flex flex-col justify-between items-center h-[calc(100vh-11rem)] w-full'>
      <div id="editorjs" className="font-gelasio overflow-y-auto w-[60%] scrollbar " onKeyDo5wn={handleKeyDown }  ></div>
      <div className="flex justify-between mx-auto max-w-[900px] w-full px-4">
        <button
          type="button"
          className="w-1/2 py-2.5 px-5 mr-2 mb-4 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 focus:outline-none hover:bg-blue-500 focus:z-10 focus:ring-4 focus:ring-blue-100"
          onClick={() => handleEditClick(noteId)}
        >
          Edit and Save Title
        </button>
        <button
          type="button"
          className="w-1/2 py-2.5 px-5 ml-2 mb-4 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 focus:outline-none hover:bg-blue-500 focus:z-10 focus:ring-4 focus:ring-blue-100"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
      </div>
    </section>
  </div>
  );
};

export default NoteEditor;