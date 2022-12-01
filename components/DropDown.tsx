import React, { useState } from 'react';

const DropDown = ({ header, dropdownItems }) => {
  const [isOpen, setOpen] = useState(false);
  let arr = dropdownItems;
  let label = header;
  const handleDropDown = () => {
    setOpen(!isOpen);
  };
  return (
    <>
      <button className='text-black text-center inline-flex items-center' onClick={() => handleDropDown}>
        {label}
        <svg className='ml-2 w-4 h-4' aria-hidden='true' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='/assets/dropdown.jpg'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
        </svg>
      </button>

      <div id='dropdown' className={`z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow ${isOpen ? 'block' : 'hidden'}`}>
        <ul className=' z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow '>
          {arr.map(function (item) {
            return (
              <li key={item}>
                <a href='#' className='block py-2 px-4 hover:bg-gray-100'>
                  {item.clickOption}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default DropDown;
