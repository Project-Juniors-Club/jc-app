import { ChangeEvent, useState } from 'react';
import { DeepMap, FieldError, FieldValues, UseFormRegister, UseFormResetField } from 'react-hook-form';
import { TextInput } from './TextInput';

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
              value={1}
              {...register('isFree', {
                onChange: handleIsFreeChange,
              })}
              disabled={isDisabled}
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
              value={0}
              {...register('isFree', {
                onChange: handleIsFreeChange,
              })}
              disabled={isDisabled}
            />
            <label htmlFor='paid' className='ml-3 block'>
              Paid
            </label>
          </div>
        </div>
        {!isFree && (
          <TextInput
            label='price'
            headerText=''
            placeholderText='Course Price ($)'
            register={register}
            options={{
              required: { value: !isFree, message: 'This is required' },
              pattern: { value: /^\d+(\.\d{2})?$/, message: 'Please enter a valid price' },
            }}
            isDisabled={isDisabled}
            errors={errors}
          />
        )}
      </div>
    </div>
  );
};
