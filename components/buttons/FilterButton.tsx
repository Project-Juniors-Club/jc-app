import Image from 'next/image';
import React, { SetStateAction, Dispatch } from 'react';
import { Popover } from '@headlessui/react';
import { FilterTypes } from '../course/homepage/CourseList';

const FilterButton = ({
  filterList,
  filter,
  setFilter,
}: {
  filterList: FilterTypes[];
  filter: FilterTypes[];
  setFilter: Dispatch<SetStateAction<FilterTypes[]>>;
}) => {
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    close: (focusableElement?: HTMLElement | React.MutableRefObject<HTMLElement>) => void,
  ) => {
    e.preventDefault();
    const appliedFilters: FilterTypes[] = [];
    filterList.forEach(filter => {
      const x = { title: filter.title, options: [] };
      filter.options.forEach(option => {
        if (e.target[option].checked) x.options.push(option);
      });
      appliedFilters.push(x);
    });
    setFilter(appliedFilters);
    close();
  };
  return (
    <Popover className='relative'>
      <Popover.Button className='flex items-center rounded-lg border border-solid border-[#7FB519] py-2.5 pr-5 pl-[1.625rem] text-[#385600]'>
        Filter
        <Image className='pl-1' src={'/icons/Filter.svg'} alt='Filter' width={28} height={28} />
      </Popover.Button>
      <Popover.Panel className='absolute w-[25.125rem] rounded-[0.625rem] border border-solid border-[#C7C7C7] bg-white px-3 pt-3 pb-1.5'>
        {({ close }) => (
          <form onSubmit={e => handleSubmit(e, close)}>
            <div className='flex gap-3'>
              {filterList.map(x => {
                return (
                  <div className='flex-grow' key={x.title}>
                    <h4 className='mb-2.5 text-sm font-bold'>{x.title}</h4>
                    <div className='rounded-md border border-solid border-[#c7c7c7] py-1.5'>
                      {x.options.map(option => {
                        return (
                          <div className='flex h-8 items-center gap-3 pl-4' key={option}>
                            <label className='flex items-center text-sm'>
                              <input
                                type={'checkbox'}
                                className='mr-3'
                                name={option}
                                defaultChecked={filter.find(y => y.title === x.title)?.options.find(z => z === option) === option}
                              />
                              {option}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <button className={'float-right mt-2.5 rounded-lg border border-solid border-[#7FB519] bg-[#A9D357] px-10 py-3'} type='submit'>
              Apply
            </button>
          </form>
        )}
      </Popover.Panel>
    </Popover>
  );
};

export default FilterButton;
