import React from 'react'

function SearchBar({searchTitle}) {
  return (
    <input type='text' placeholder='Search' className='border-solid border-2 border-gray-500 text-center h-10  md:w-96  rounded-[90px] absolute z-50  top-[20px] ' onChange={(e)=>searchTitle(e.target.value)}></input>
  )
}

export default SearchBar;