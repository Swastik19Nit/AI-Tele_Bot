'use client'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '@/app/(marketing)/_components/Modal';

const CreateNoteDialog = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onCreateNote = async (noteName: string) => {
    try {
      const res = await fetch("/api/createNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          noteName
        }),
      })
    } catch (error) {
      console.log("Failed to create note");
    }
  }
  return (
    <Dialog>
      <DialogTrigger>
        <div className=' w-[15rem] md:w-[30rem] border-dashed border-2 flex  flex-row md:flex-col border-green-600 h-full rounded-lg justify-center items-center hover:shadow-xl transition hover:-translate-y-1 p-4' onClick={toggleModal}>
          <Plus className='w-6 h-6 text-green-600' strokeWidth={3} />
          <h2 className='font-semibold text-green-600 sm:mt-2'>New NoteBook</h2>
        </div>
      </DialogTrigger>
      {showModal && <Modal onClose={toggleModal} onCreate={onCreateNote} />}
    </Dialog>
  );
};

export default CreateNoteDialog;

