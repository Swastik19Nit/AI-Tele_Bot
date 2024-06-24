import React from 'react';
import Link from 'next/link';
import Group from '../_components/Group';
import Create from '../_components/Create';
import CreateNoteDialog from './createNoteDialog';

function MinNav({ data }) {
  return (
    <div className='flex flex-col gap-6'>
      <CreateNoteDialog/>
      <h1 className='text-3xl font-bold'>{data ? 'Recent Folder' : 'My Notes'}</h1>
      <nav className='flex gap-6 text-gray-400'>
      </nav>
      <div className='flex gap-x-5 items-center mr-4 '> {/* Apply mr-4 class here */}
        <Group data={data} />
        {/* <Create data={true} /> */}
      </div>
    </div>
  );
}

export default MinNav;
