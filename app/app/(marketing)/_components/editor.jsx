"use client"
// import React, { useEffect, useContext, useRef } from 'react';
// import { EditorContext } from '@/components/EditorContext';
// import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';

// const NoteEditor = () => {
//   const { initEditor, editorInstanceRef } = useContext(EditorContext);
//   const editorRef = useRef(null);
//   const searchParams = useSearchParams();
//   const title = searchParams.get('title');
//   const body = searchParams.get('body');

//   useEffect(() => {
//     if (!editorRef.current && initEditor) {
//       const editor = initEditor();
//       editorRef.current = true;

//       editor.isReady
//         .then(() => {
//           const data = {
//             time: new Date().getTime(),
//             blocks: [
//               {
//                 type: 'paragraph',
//                 data: {
//                   text: body || 'Start writing your note...',
//                 },
//               },
//             ],
//           };
//           editor.render(data);
//         })
//         .catch((err) => {
//           console.error('Failed to render initial content:', err);
//         });
//     }
//   }, [initEditor, editorRef.current]);

//   const handleTitleChange = (e) => {
//     let input = e.target;
//     input.style.height = 'auto';
//     input.style.height = input.scrollHeight + 'px';
//     e.preventDefault();
//   };

//   const handleTitleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//     }
//   };

//   return (
//     <div>
//       <section>
//         <div className="mx-auto max-w-[900px] w-full flex items-center">
//           <button
//             type="button"
//             className="py-2.5 px-5 mr-4 mb-4 text-sm font-medium text-blue-700 focus:outline-none bg-white rounded-lg border border-blue-700 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:ring-4 focus:ring-blue-100"
//           >
//             Edit
//           </button>
//           <textarea
//             placeholder="Note Title"
//             className="ml-4 text-4xl font-medium w-full h-20 outline-none resize-none leading-tight placeholder:opacity-40 mt-1"
//             onKeyDown={handleTitleKeyDown}
//             onChange={handleTitleChange}
//             defaultValue={title || ''}
//           />
//         </div>
//         <div id="editorjs" className="font-gelasio"></div>
//         <button
//             type="button"
//             className="py-2.5 px-5 mr-4 mb-4 text-sm font-medium text-blue-700 focus:outline-none bg-white rounded-lg border border-blue-700 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:ring-4 focus:ring-blue-100"
//           >
//             Save
//           </button>
//       </section>
//     </div>
//   );
// };

// export default NoteEditor;
import React, { useEffect, useContext, useRef } from 'react';
import { EditorContext } from '@/components/EditorContext';
import { useSearchParams } from 'next/navigation';

const NoteEditor = () => {
  const { initEditor } = useContext(EditorContext);
  const editorRef = useRef(null);
  const searchParams = useSearchParams();
  const initialTitle = searchParams.get('title') || '';
  const initialBody = searchParams.get('body') || '';
  const noteId = searchParams.get('noteId') || '';

  useEffect(() => {
    if (!editorRef.current && initEditor) {
      const editor = initEditor();
      editorRef.current = true;

      editor.isReady
        .then(() => {
          const data = {
            time: new Date().getTime(),
            blocks: [
              {
                type: 'paragraph',
                data: {
                  text: initialBody || 'Start writing your note...',
                },
              },
            ],
          };
          editor.render(data);
        })
        .catch((err) => {
          console.error('Failed to render initial content:', err);
        });
    }
  }, [initEditor, editorRef.current, initialBody]);

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
    fetch('/api/title', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        noteId,
        newTitle: initialTitle,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <section>
        <div className="mx-auto max-w-[900px] w-full flex items-center">
          <button
            type="button"
            className="py-2.5 px-5 mr-4 mb-4 text-sm font-medium text-blue-700 focus:outline-none bg-white rounded-lg border border-blue-700 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:ring-4 focus:ring-blue-100"
          >
            Edit
          </button>
          <textarea
            placeholder={initialTitle || 'Note Title'}
            className="ml-4 text-4xl font-medium w-full h-20 outline-none resize-none leading-tight placeholder:opacity-40 mt-1"
            onKeyDown={handleTitleKeyDown}
            onChange={handleTitleChange}
            defaultValue={initialTitle || ''}
          />
        </div>
        <div id="editorjs" className="font-gelasio"></div>
        <button
          type="button"
          className="py-2.5 px-5 mr-4 mb-4 text-sm font-medium text-blue-700 focus:outline-none bg-white rounded-lg border border-blue-700 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:ring-4 focus:ring-blue-100"
          onClick={handleSave}
        >
          Save
        </button>
      </section>
    </div>
  );
};

export default NoteEditor;
