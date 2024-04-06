"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaPencilAlt } from 'react-icons/fa';

const Profile = () => {
    const { data: session, status: sessionStatus } = useSession();
    const email = session?.user?.email;

    return (
      <div className='relative w-full h-screen overflow-hidden'>
          <div className='absolute top-0 right-0 w-full flex flex-col items-center p-5'>
              <div className='bg-blue-500 w-full h-44 rounded-lg flex justify-center items-center relative'>
                  <div className='w-36 h-50 mt-20 bg-white rounded-full overflow-hidden shadow-lg'>
                      <Image
                          src="/OIG3.png"
                          width={400} 
                          height={400}
                          alt="Profile Picture"
                      />
                  </div>
                  {/* Text at the bottom right */}
              </div>

              <p className="text-blue-700 text-4xl font-bold mt-9 mb-13">Welcome back!!!</p>
              <p className="text-blue-700 text-4xl font-bold ">{email}</p>
              
        
          </div>
      </div>
  );
};


export default Profile;
