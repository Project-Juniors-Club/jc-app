import Image from 'next/image';
import React from 'react';

const FilterButton = () => {
  return (
    <button className='flex items-center rounded-lg border border-solid border-[#7FB519] py-2.5 pr-5 pl-[1.625rem] text-[#385600]'>
      Filter
      <Image className='pl-1' src={'/icons/Filter.svg'} alt='Filter' width={28} height={28} />
    </button>
  );
};

export default FilterButton;
