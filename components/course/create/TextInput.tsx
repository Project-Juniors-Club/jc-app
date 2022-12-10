import { DeepMap, FieldError, FieldErrors, FieldErrorsImpl, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

type Props = {
  label: string;
  headerText: string;
  placeholderText?: string;
  register: UseFormRegister<FieldValues>;
  options: RegisterOptions;
  isDisabled: boolean;
  errors: DeepMap<FieldValues, FieldError>;
};

export const TextInput = ({ label, register, options, headerText, placeholderText = headerText, isDisabled, errors }: Props) => {
  return (
    <div className='grid gap-y-2'>
      <label htmlFor={label}>
        <div className='inline font-bold text-[#3D3D3D]'>{headerText}</div>
        <div className='inline font-normal text-[#606060]'>{options?.required ? ' *' : ''}</div>
      </label>
      <input
        type='text'
        name={label}
        className={`w-full rounded-lg ${
          errors[label] ? 'border-2 border-[#E53E3E]' : 'border border-[#9E9E9E]'
        } py-2 px-4 placeholder:text-[#C7C7C7] ${isDisabled ? 'bg-slate-50' : ''}`}
        placeholder={placeholderText}
        {...register(label, options)}
        disabled={isDisabled}
      />
      {errors[label] ? <div className='text-[#E53E3E]'>{errors[label].message}</div> : <></>}
    </div>
  );
};
