'use client'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '@/app/(marketing)/_components/Modal';

const CreateNoteDialog = ({setCreate}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
    setCreate(prev=>!prev);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className=' w-[15rem] md:w-[30rem] border-dashed border-2 flex  flex-row md:flex-col border-green-600 h-full rounded-lg justify-center items-center hover:shadow-xl transition hover:-translate-y-1 p-4' onClick={toggleModal}>
          <Plus className='w-6 h-6 text-green-600' strokeWidth={3} />
          <h2 className='font-semibold text-green-600 sm:mt-2'>New NoteBook</h2>
        </div>
      </DialogTrigger>
      {showModal && <Modal onClose={toggleModal} />}
    </Dialog>
  );
};

export default CreateNoteDialog;
// onCreate={onCreateNote}
