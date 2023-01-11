import React from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const DropDown = ({ buttonName, dropdownItems }) => {
  let arr = dropdownItems;
  return (
    <Menu as='div'>
      <Menu.Button className='inline-flex items-center text-center text-black'>
        {buttonName}
        <ChevronDownIcon className='ml-2 -mr-1 h-5 w-5 text-[#434343]' aria-hidden='true' />
      </Menu.Button>
      <Menu.Items className={`absolute mt-8 divide-y divide-gray-100 shadow`}>
        {arr.map(item => {
          return (
            <Menu.Item as='div' key='item.clickOption' className={`block py-2 px-4`}>
              {({ active }) => (
                <a className={`${active}`} href='#'>
                  {item.clickOption}
                </a>
              )}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default DropDown;
