import { ChangeEvent, useState } from 'react';
import { FieldValues, UseFormRegister, UseFormResetField } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FieldValues>;
};

export const PriceInput = ({ register }: Props) => {
  const [isFree, setIsFree] = useState(1);

  const handleIsFreeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFree(+e.target.value);
  };

  const radioRegister = register('isFree', {
    onChange: handleIsFreeChange,
    required: true,
  });

  return (
    <div>
      <label htmlFor='price'>
        <div className='inline font-bold text-[#3D3D3D]'>{'Course Price ($)'}</div>
        <div className='inline font-normal text-[#606060]'> *</div>
      </label>
      <div>
        <div className='flex gap-x-6 py-1.5'>
          <div className='flex items-center'>
            <input
              id='free'
              name='isFree'
              type='radio'
              className='h-4 w-4 border-2 border-[#E6E6E6] text-[#9BCB3F] focus:ring-0 focus:ring-[#E6E6E6]'
              onChange={handleIsFreeChange}
              value={1}
              {...radioRegister}
              defaultChecked
            />
            <label htmlFor='free' className='ml-3 block'>
              Free
            </label>
          </div>
          <div className='flex items-center'>
            <input
              id='paid'
              name='isFree'
              type='radio'
              className='h-4 w-4 border-2 border-[#E6E6E6] text-[#9BCB3F] focus:ring-0 focus:ring-[#E6E6E6]'
              onChange={handleIsFreeChange}
              value={0}
              {...radioRegister}
            />
            <label htmlFor='paid' className='ml-3 block'>
              Paid
            </label>
          </div>
        </div>
        <input
          type='text'
          name='title'
          className={`block w-full rounded-lg border border-[#9E9E9E] py-2 px-4 placeholder:text-[#C7C7C7] ${isFree ? 'hidden' : ''}`}
          placeholder='Course Price ($)'
          {...register('price', { required: !isFree, pattern: /^\d+(\.\d{2})?$/ })}
        />
      </div>
    </div>
  );
};
