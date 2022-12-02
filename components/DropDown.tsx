import React from 'react';

const DropDown = ({ buttonName, dropdownItems, isOpen, setOpen }) => {
  let arr = dropdownItems;

  return (
    <div className='dropdownElem'>
      <div className='dropdownButton'>
        <button className='text-black text-center inline-flex items-center' onClick={() => setOpen(!isOpen)}>
          {buttonName}
          <svg
            className='ml-2 w-4 h-4'
            aria-hidden='true'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='/assets/logos/dropdown.svg'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
          </svg>
        </button>
      </div>

      <div id='dropdown' className={`divide-y divide-gray-100 shadow ${isOpen ? 'block' : 'hidden'}`}>
        <ul className='bg-white rounded divide-y divide-gray-100 shadow '>
          {arr.map(item => {
            return (
              <li key='item'>
                <a href='#' className='block py-2 px-4 hover:bg-gray-100'>
                  {item.clickOption}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
