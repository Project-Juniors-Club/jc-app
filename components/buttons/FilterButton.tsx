import Image from 'next/image';
import React from 'react';
import { Popover } from '@headlessui/react';

const FilterButton = () => {
  return (
    <Popover className='relative'>
      <Popover.Button className='flex items-center rounded-lg border border-solid border-[#7FB519] py-2.5 pr-5 pl-[1.625rem] text-[#385600]'>
        Filter
        <Image className='pl-1' src={'/icons/Filter.svg'} alt='Filter' width={28} height={28} />
      </Popover.Button>
      <Popover.Panel className='absolute w-[402px] rounded-[10px] border border-solid border-[#C7C7C7] bg-white px-3 pt-3 pb-1.5'>
        <div className='flex gap-3'>
          <div className='flex-grow'>
            <h4 className='mb-2.5 text-sm font-bold'>Category</h4>
            <div className='rounded-md border border-solid border-[#c7c7c7] py-1.5'>
              <div className='flex h-8 items-center gap-3 pl-4'>
                <input type={'checkbox'} />
                <p>Category 1</p>
              </div>
              <div className='flex h-8 items-center gap-3 pl-4'>
                <input type={'checkbox'} />
                <p>Category 2</p>
              </div>
              <div className='flex h-8 items-center gap-3 pl-4'>
                <input type={'checkbox'} />
                <p>Category 3</p>
              </div>
              <div className='flex h-8 items-center gap-3 pl-4'>
                <input type={'checkbox'} />
                <p>Category 4</p>
              </div>
            </div>
          </div>
          <div className='flex-grow'>
            <h4 className='mb-2.5 text-sm font-bold'>Duration</h4>
            <div className='rounded-md border border-solid border-[#c7c7c7] py-1.5'>
              <div className='flex h-8 items-center gap-3 pl-4'>
                <input type={'checkbox'} />
                <p>0-5 hours</p>
              </div>
              <div className='flex h-8 items-center gap-3 pl-4'>
                <input type={'checkbox'} />
                <p>5-10 hours</p>
              </div>
              <div className='flex h-8 items-center gap-3 pl-4'>
                <input type={'checkbox'} />
                <p>10-15 hours</p>
              </div>
              <div className='flex h-8 items-center gap-3 pl-4'>
                <input type={'checkbox'} />
                <p>&gt;15 hours</p>
              </div>
            </div>
          </div>
        </div>
        <Popover.Button className={'float-right mt-2.5 rounded-lg border border-solid border-[#7FB519] bg-[#A9D357] px-10 py-3'}>
          Apply
        </Popover.Button>
      </Popover.Panel>
    </Popover>
  );
};

export default FilterButton;
