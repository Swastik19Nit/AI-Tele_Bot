import Image from 'next/image';

const Heroes = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
      <div className='flex items-center'>
        <div className='relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]'>
          <Image
            src="/OIG3.png" // Provide the correct path to the image file
            width={320} // Set the width of the image
            height={320} // Set the height of the image
            alt="d"
          />
        </div>
        <div className='relative w-[300px] h-[300px] hidden md:block'>
          <Image
            src="/OIG4.png" // Provide the correct path to the image file
            width={420} // Set the width of the image
            height={420} // Set the height of the image
            alt="d9"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
