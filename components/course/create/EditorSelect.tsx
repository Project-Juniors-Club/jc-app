import { Listbox } from '@headlessui/react';
import Image from 'next/image';
import { useController, UseControllerProps } from 'react-hook-form';
import { Admin } from '../../../interfaces';

type Props = {
  editors: Admin[];
  disabled: boolean;
  defaultEditor?: Admin;
};

const EditorSelect = ({
  editors,
  disabled,
  defaultEditor = {
    userId: undefined,
    user: {
      username: undefined,
    },
  },
  ...rest
}: Props & UseControllerProps) => {
  const {
    field: { value, onChange },
  } = useController({ defaultValue: defaultEditor, ...rest });

  return (
    <div className='grid gap-y-2'>
      <label htmlFor='editors'>
        <div className='inline font-bold text-[#3D3D3D]'>{'Course Editor'}</div>
      </label>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        {({ open, disabled }) => {
          return (
            <>
              <Listbox.Button
                className={`h-10 w-full rounded-lg border ${open ? 'border-[#4D4D4D]' : 'border-[#9E9E9E]'} py-2 px-4 text-left ${
                  disabled ? 'bg-slate-50' : ''
                }`}
              >
                <div className='flex justify-between'>
                  <div className={`${value?.user.username ? '' : 'text-[#C7C7C7]'}`}>{value?.user.username || 'Course Editor'}</div>
                  <Image src={'/icons/Select.svg'} alt='Select' width={10.61} height={6.48} />
                </div>
              </Listbox.Button>
              <Listbox.Options className='rounded-md border border-[#C7C7C7] py-1.5'>
                {editors.map((editor, idx) => (
                  <Listbox.Option key={idx} value={editor} className='py-1.5 px-4 hover:cursor-pointer hover:bg-slate-200'>
                    {editor.user.username}
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

export default EditorSelect;
