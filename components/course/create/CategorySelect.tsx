import { Listbox } from '@headlessui/react';
import { Category } from '@prisma/client';
import Image from 'next/image';
import { useController, UseControllerProps } from 'react-hook-form';

type Props = {
  categories: Category[];
};

export const CategorySelect = (props: Props & UseControllerProps) => {
  const propsWithDefaultValue = {
    ...props,
    defaultValue: {
      id: undefined,
      name: undefined,
      description: undefined,
    },
  };
  const {
    field: { value, onChange },
  } = useController(propsWithDefaultValue);

  const { categories } = propsWithDefaultValue;

  return (
    <div className='grid gap-y-2'>
      <label htmlFor='category'>
        <div className='inline font-bold text-[#3D3D3D]'>{'Course Category'}</div>
      </label>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => {
          return (
            <>
              <Listbox.Button
                className={`h-10 w-full rounded-lg border ${open ? 'border-[#4D4D4D]' : 'border-[#9E9E9E]'} py-2 px-4 text-left`}
              >
                <div className='flex justify-between'>
                  <div className={`${value?.name ? '' : 'text-[#C7C7C7]'}`}>{value?.name || 'Course Category'}</div>
                  <Image src={'/icons/Select.svg'} alt='Select' width={10.61} height={6.48} />
                </div>
              </Listbox.Button>
              <Listbox.Options className='rounded-md border border-[#C7C7C7] py-1.5'>
                {categories.map((category, idx) => (
                  <Listbox.Option key={idx} value={category} className='py-1.5 px-4 hover:cursor-pointer hover:bg-slate-200'>
                    {category.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </>
          );
        }}
      </Listbox>
    </div>
  );
};
