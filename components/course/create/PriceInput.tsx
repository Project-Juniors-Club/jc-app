import { ChangeEvent, useState } from 'react';
import { DeepMap, FieldError, FieldValues, UseFormRegister, UseFormResetField } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FieldValues>;
  isDisabled: boolean;
  errors: DeepMap<FieldValues, FieldError>;
};

export const PriceInput = ({ register, errors, isDisabled }: Props) => {
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
              disabled={isDisabled}
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
              disabled={isDisabled}
            />
            <label htmlFor='paid' className='ml-3 block'>
              Paid
            </label>
          </div>
        </div>
        <input
          type='text'
          name='title'
          className={`w-full rounded-lg ${
            errors.price ? 'border-2 border-[#E53E3E]' : 'border border-[#9E9E9E]'
          } py-2 px-4 placeholder:text-[#C7C7C7] ${isDisabled ? 'bg-slate-50' : ''} ${isFree ? 'hidden' : ''}`}
          placeholder='Course Price ($)'
          {...register('price', { required: !isFree, pattern: { value: /^\d+(\.\d{2})?$/, message: 'Please enter a valid price' } })}
        />
        {errors.price ? <div className='text-[#E53E3E]'>{errors.price.message}</div> : <></>}
      </div>
    </div>
  );
};
