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

  const onCreateNote = (noteName: string) => {
    console.log('Creating note:', noteName);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className='border-dashed border-2 flex border-green-600 h-full rounded-lg items justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4' onClick={toggleModal} >
          <Plus className='w-6 h-6 text-green-600' strokeWidth={3} />
          <h2 className='font-semibold text-green-600 sm:mt-2'>New Notes</h2>
        </div>
      </DialogTrigger>
      {showModal && <Modal onClose={toggleModal} />}
    </Dialog>
  );
};

export default CreateNoteDialog;

