// import React from 'react';
// import { useRouter } from 'next/navigation';

// const Modale = ({ onClose, title, body }) => {
//     const router = useRouter();

//   const handleEditNotes = () => {
//     router.push(`/editor?title=${encodeURIComponent(title)}`);
//   };

//   return (
//     <div
//       id="static-modal"
//       data-modal-backdrop="static"
//       tabIndex="-1"
//       aria-hidden="true"
//       className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center bg-gray-900 bg-opacity-50"
//     >
//       <div className="relative p-4 w-full max-w-2xl max-h-full">
//         <div className="relative bg-white rounded-lg shadow">
//           <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
//             <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
//             <button
//               type="button"
//               className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
//               onClick={onClose}
//             >
//               <svg
//                 className="w-3 h-3"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 14 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                 />
//               </svg>
//               <span className="sr-only">Close modal</span>
//             </button>
//           </div>
//           <div className="p-4 md:p-5 space-y-4">
//             <p className="text-base leading-relaxed text-gray-500">{body}</p>
//           </div>
//           <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
//             <button
//               type="button"
//               className="py-2.5 px-5 ms-auto text-sm font-medium text-blue-700 focus:outline-none bg-white rounded-lg border border-blue-700 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:ring-4 focus:ring-blue-100"
//               onClick={onClose}
//             >
//               Close
//             </button>
//             <button
//               type="button"
//               className="py-2.5 px-5 ms-3 text-sm font-medium text-white-700 focus:outline-none bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:ring-4 focus:ring-blue-100"
//               onClick={handleEditNotes}
//             >
//               Edit 
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modale;
// Modale.jsx
import React from 'react';
import { useRouter } from 'next/navigation';

const Modale = ({ onClose, title, body, noteId }) => {
    const router = useRouter();
  
    const handleEditNotes = () => {
      router.push(
        `/editor?title=${encodeURIComponent(title)}&body=${encodeURIComponent(
          body
        )}&noteId=${encodeURIComponent(noteId)}`
      );
    };

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center bg-gray-900 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500">{body}</p>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
            <button
              type="button"
              className="py-2.5 px-5 ms-auto text-sm font-medium text-blue-700 focus:outline-none bg-white rounded-lg border border-blue-700 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:ring-4 focus:ring-blue-100"
              onClick={onClose}
            >
              Close
            </button>
            <button
      type="button"
      className="py-2.5 px-5 ms-3 text-sm font-medium text-white-700 focus:outline-none bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:ring-4 focus:ring-blue-100"
      onClick={handleEditNotes}
    >
      Edit Notes
    </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modale;