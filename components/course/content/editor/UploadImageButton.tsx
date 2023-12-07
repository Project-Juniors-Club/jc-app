import Image from 'next/image';
import Button from '../../../Button';
import { useRef } from 'react';
import { useController, Control, useWatch, UseFormReturn } from 'react-hook-form';
import { setConstantValue } from 'typescript';

type Props = {
  useFormReturns: UseFormReturn<any>;
  isDisabled: boolean;
  imageFilename: string;
};

const UploadImageButton = ({ useFormReturns: { control, setValue, resetField, clearErrors }, isDisabled, imageFilename }: Props) => {
  const {
    field: { onChange: removeOriginal },
  } = useController({ name: 'image.removeOriginal', control: control });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const uploadedFile: File = useWatch({ name: 'image.uploadedFile', control: control });
  const originalRemoved: boolean = useWatch({ name: 'image.removeOriginal', control: control });
  const {
    field: { ref },
    fieldState: { error },
    ...rest
  } = useController({
    name: 'image.uploadedFile',
    control: control,
    rules: {
      required: { value: !uploadedFile && ((!!imageFilename && originalRemoved) || !imageFilename), message: 'This is required' },
    },
  });

  return (
    <div className='grid gap-y-2'>
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
          if (e.target.files.length) {
            removeOriginal(true);
            setValue('image.uploadedFile', e.target.files[0]);
            clearErrors('image.uploadedFile');
          }
          e.target.value = '';
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
        <div className='text-dark-gray'>{'Upload Image'}</div>
      </Button>
      <div className='text-[#C90707]'>{error?.message}</div>
      <div className={`flex h-6 w-max min-w-[167px] items-center justify-between ${uploadedFile ? '' : 'hidden'}`}>
        <div className={`flex`}>
          <Image src={'/icons/Image.svg'} alt='Image' width={24} height={24} />
          <div className='ml-3.5'>{uploadedFile?.name}</div>
        </div>
        <div
          className='ml-9 hover:cursor-pointer'
          onClick={() => {
            resetField('image.uploadedFile');
          }}
        >
          <Image src={'/icons/Cross.svg'} alt='Cross' width={14} height={14} />
        </div>
      </div>
      <div className={`flex h-6 w-max min-w-[167px] items-center justify-between ${imageFilename && !originalRemoved ? '' : 'hidden'}`}>
        <div className={`flex`}>
          <Image src={'/icons/Image.svg'} alt='Image' width={24} height={24} />
          <div className='ml-3.5'>{imageFilename}</div>
        </div>
        <div className='ml-9 hover:cursor-pointer' onClick={() => removeOriginal(true)}>
          <Image src={'/icons/Cross.svg'} alt='Cross' width={14} height={14} />
        </div>
      </div>
    </div>
  );
};

export default UploadImageButton;
