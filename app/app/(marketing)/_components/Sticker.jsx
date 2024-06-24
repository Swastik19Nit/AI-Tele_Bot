import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SiBitbucket } from "react-icons/si";
import { MdOutlineTimer } from 'react-icons/md';
import Modale from './Modale';

function Sticker({ title, description, date }) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleSave = (data) => {
        console.log('Saved data:', data);
        // You can perform further actions with the saved data here
    };

    return (
        <>
            <div className='w-56 h-[16rem] px-3 py-4 relative flex flex-col gap-2 bg-[#e8a4a0d1] rounded-xl hover:shadow-md hover:shadow-[#f3aba8d1]'>
                <h4 className='text-xs'>{date}</h4>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>{title}</h2>
                    <FaPencilAlt size={'1em'} className='cursor-pointer' onClick={toggleModal} />
                </div>
                <hr className="border-[1px] my-1 border-black" />
                <p className='text-sm h-40 overflow-hidden'>{description}</p>
                <div className='flex items-center gap-x-5'>
                    <MdOutlineTimer size={'1.3em'} />
                    <h5 className='text-xs text-gray-600'>10:30 PM , Monday</h5>
                    <SiBitbucket size={'1em'} style={{ marginLeft: '0.9em' }} onClick={toggleModal} />
                </div>
            </div>
            {showModal && <Modale onClose={toggleModal} onSave={handleSave} title={title} body={description} />}
        </>
    );
}

export default Sticker;
