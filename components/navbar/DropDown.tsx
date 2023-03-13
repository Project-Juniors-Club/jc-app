import React from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

// This is a reusable dropdown component
const DropDown = ({ buttonName, dropdownItems }: { buttonName: string; dropdownItems: any[] }) => {
  let arr = dropdownItems;
  return (
    <Menu as='div'>
      <Menu.Button className='inline-flex items-center text-center text-black'>
        {buttonName}
        <ChevronDownIcon className='ml-2 -mr-1 h-5 w-5 text-[#434343]' aria-hidden='true' />
      </Menu.Button>
      <Menu.Items className={`absolute mt-6 divide-y divide-slate-600 rounded-lg bg-white shadow-lg`}>
        {arr.map(item => {
          return (
            <Menu.Item as='div' key={item.clickOption} className={`block py-4 px-6`}>
              {({ active }) => (
                <a className={`${active}`} onClick={item.onClick} href='#'>
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
