import Image from 'next/image';
import Button from '../../../Button';
import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';
import { FieldValues, UseFormRegister, UseFormRegisterReturn, UseFormResetField, UseFormSetValue, UseFormWatch } from 'react-hook-form';

type Props = {
  label: string;
  headerText: string;
  buttonText: string;
  register: UseFormRegister<any>;
  resetField: UseFormResetField<FieldValues>;
  isDisabled: boolean;
  watch: UseFormWatch<any>;
  removeImageOnClick?: () => void;
  imageFilename?: string;
};

const UploadImageButton = ({
  label,
  register,
  resetField,
  headerText,
  buttonText,
  isDisabled,
  watch,
  removeImageOnClick = () => {},
  imageFilename,
}: Props) => {
  const { ref, onChange, ...rest } = register(label);
  const fileWatch = watch(label, []) as FileList;
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className='grid gap-y-2'>
      <label htmlFor={label} className='inline font-bold text-[#3D3D3D]'>
        {headerText}
      </label>
      <input
        type='file'
        className='hidden'
        accept='.jpg,.png'
        {...rest}
        ref={e => {
          ref(e);
          inputRef.current = e;
        }}
        onChange={e => {
          onChange(e);
          removeImageOnClick();
        }}
      />
      <Button
        variant={'green-outline'}
        onClick={event => {
          event.preventDefault();
          inputRef.current.click();
        }}
        isDisabled={isDisabled}
      >
        <div className='text-[#385600]'>{buttonText}</div>
      </Button>
      <div className={`flex h-6 w-max min-w-[167px] items-center justify-between ${fileWatch?.length ? '' : 'hidden'}`}>
        <div className={`flex`}>
          <Image src={'/icons/Image.svg'} alt='Image' width={24} height={24} />
          <div className='ml-3.5'>{fileWatch?.length ? fileWatch[0].name : ''}</div>
        </div>
        <div
          className='ml-9 hover:cursor-pointer'
          onClick={() => {
            resetField(label, { defaultValue: [] });
          }}
        >
          <Image src={'/icons/Cross.svg'} alt='Cross' width={14} height={14} />
        </div>
      </div>
      <div className={`flex h-6 w-max min-w-[167px] items-center justify-between ${imageFilename ? '' : 'hidden'}`}>
        <div className={`flex`}>
          <Image src={'/icons/Image.svg'} alt='Image' width={24} height={24} />
          <div className='ml-3.5'>{imageFilename}</div>
        </div>
        <div className='ml-9 hover:cursor-pointer' onClick={removeImageOnClick}>
          <Image src={'/icons/Cross.svg'} alt='Cross' width={14} height={14} />
        </div>
      </div>
    </div>
  );
};

export default UploadImageButton;
