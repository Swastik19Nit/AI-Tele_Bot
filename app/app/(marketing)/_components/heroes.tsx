import Image from 'next/image';

const Heroes = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
      <div className='flex items-center'>
        <div className='relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]'>
          <Image
            src="/OIG3.png" 
            width={320} 
            height={320} 
            alt="d"
          />
        </div>
        <div className='relative w-[300px] h-[300px] hidden md:block'>
          <Image
            src="/OIG4.png"
            width={420} 
            height={420} 
            alt="d9"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
