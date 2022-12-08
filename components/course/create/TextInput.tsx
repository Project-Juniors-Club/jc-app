import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

type Props = {
  label: string;
  headerText: string;
  placeholderText?: string;
  register: UseFormRegister<FieldValues>;
  options: RegisterOptions;
};

export const TextInput = ({ label, register, options, headerText, placeholderText = headerText }: Props) => {
  return (
    <div className='grid gap-y-2'>
      <label htmlFor={label}>
        <div className='inline font-bold text-[#3D3D3D]'>{headerText}</div>
        <div className='inline font-normal text-[#606060]'>{options?.required ? ' *' : ''}</div>
      </label>
      <input
        type='text'
        name={label}
        className='w-full rounded-lg border border-[#9E9E9E] py-2 px-4 placeholder:text-[#C7C7C7] required:border-red-700 focus:required:border-red-700'
        placeholder={placeholderText}
        {...register(label, options)}
      />
    </div>
  );
};
