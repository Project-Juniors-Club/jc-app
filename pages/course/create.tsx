import Image from 'next/image';
import { Listbox } from '@headlessui/react';
import { Category } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/Buttons';
import prisma from '../../lib/prisma';
import Modal from '../../components/Modal';
import { ButtonGroup, ModalBody, ModalFooter, useDisclosure, Text } from '@chakra-ui/react';

const CourseCreatePage = ({ categories }: { categories: Category[] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [selectedCategory, setSelectedCategory] = useState<Category>(undefined);
  const [isFree, setIsFree] = useState('true');

  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };

  const handleIsFreeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFree(e.target.value);
  };

  const onSubmit = () => {
    console.log('submitting');
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className='px-[9.375rem]'>
      <header className='font-header py-16 text-5xl font-bold'>Create Course</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-y-6'>
          <div className='grid gap-y-2'>
            <label htmlFor='title'>
              <div className='inline font-bold text-[#3D3D3D]'>Course Title</div>
              <div className='inline font-normal text-[#606060]'> *</div>
            </label>
            <input
              type='text'
              name='title'
              className='w-full rounded-lg border border-[#9E9E9E] py-2 px-4 placeholder:text-[#C7C7C7]'
              placeholder='Course Title'
            />
          </div>
          <div className='grid gap-y-2'>
            <label htmlFor='description'>
              <div className='inline font-bold text-[#3D3D3D]'>Course Description</div>
              <div className='inline font-normal text-[#606060]'> *</div>
            </label>
            <textarea
              name='description'
              className='min-h-[5rem] w-full rounded-lg border border-[#9E9E9E] py-2 px-4 leading-tight placeholder:text-[#C7C7C7]'
              placeholder='Course Description'
            />
          </div>
          <div className='grid gap-y-2'>
            <label htmlFor='learningObjectives'>
              <div className='inline font-bold text-[#3D3D3D]'>Course Learning Objectives</div>
              <div className='inline font-normal text-[#606060]'> *</div>
            </label>
            <textarea
              name='learningObjectives'
              className='min-h-[5rem] w-full rounded-lg border border-[#9E9E9E] py-2 px-4 leading-tight placeholder:text-[#C7C7C7]'
              placeholder='Course Learning Objectives'
            />
          </div>
          <div className='grid gap-y-2'>
            <label htmlFor='category'>
              <div className='inline font-bold text-[#3D3D3D]'>Course Category</div>
            </label>
            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
              {({ open }) => {
                return (
                  <>
                    <Listbox.Button
                      className={`h-10 w-full rounded-lg border ${open ? 'border-[#4D4D4D]' : 'border-[#9E9E9E]'} py-2 px-4 text-left`}
                    >
                      <div className='flex justify-between'>
                        <div className={`${selectedCategory ? '' : 'text-[#C7C7C7]'}`}>
                          {selectedCategory ? selectedCategory.name : 'Course Category'}
                        </div>
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
          <div className='grid gap-y-2'>
            <label htmlFor='coverImage' className='inline font-bold text-[#3D3D3D]'>
              Course Cover Image Upload
            </label>
            <input type='file' ref={inputRef} onChange={handleFileChange} className='hidden' accept='.jpg,.png' />
            <CustomButton
              variant={'green-outline'}
              onClick={() => {
                inputRef.current.click();
              }}
            >
              <div className='text-[#385600]'>Upload Image</div>
            </CustomButton>
            <div className={`flex h-6 w-max min-w-[167px] items-center justify-between ${file ? '' : 'hidden'}`}>
              <div className={`flex`}>
                <Image src={'/icons/Image.svg'} alt='Image' width={24} height={24} />
                <div className='ml-3.5'>{file ? file.name : ''}</div>
              </div>
              <div
                className='ml-9 hover:cursor-pointer'
                onClick={() => {
                  setFile(null);
                }}
              >
                <Image src={'/icons/Cross.svg'} alt='Cross' width={14} height={14} />
              </div>
            </div>
          </div>
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
                    value='true'
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
                    value='false'
                  />
                  <label htmlFor='paid' className='ml-3 block'>
                    Paid
                  </label>
                </div>
              </div>
              <input
                type='text'
                name='title'
                className={`block w-full rounded-lg border border-[#9E9E9E] py-2 px-4 placeholder:text-[#C7C7C7] ${
                  isFree == 'true' ? 'hidden' : ''
                }`}
                placeholder='Course Price ($)'
              />
            </div>
          </div>
        </div>
        <div className='flex w-full justify-between py-8'>
          <div className='flex gap-x-3'>
            <CustomButton variant={'black-solid'}>
              <div className='text-[#FFFFFF]'>Save & Exit</div>
            </CustomButton>
            <CustomButton variant={'black-outline'} onClick={onOpen}>
              <div>Cancel</div>
            </CustomButton>
          </div>
          <CustomButton variant={'green-solid'}>
            <div>Next: Edit Course</div>
          </CustomButton>
        </div>
      </form>
      <Modal title='' onClose={onClose} isOpen={isOpen} size='xl'>
        <ModalBody>
          <div className='flex gap-x-4'>
            <Image src={'/icons/Alert.svg'} height={40} width={40} alt='Alert' />
            <div>
              <div className='text-lg font-medium'>Are you sure you want to exit without saving?</div>
              <div className='text-sm text-[#7B7B7B]'>This course will be discarded</div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing='4'>
            <CustomButton onClick={onClose} variant='black-outline'>
              <Text>Cancel</Text>
            </CustomButton>
            <CustomButton onClick={onClose} variant='black-solid'>
              <Text color='#FFFFFF'>Exit</Text>
            </CustomButton>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await prisma.category.findMany();
  // const categories: Category[] = [
  //   {
  //     id: '123',
  //     name: 'Category 1',
  //     description: 'desc',
  //   },
  //   {
  //     id: '1234',
  //     name: 'Category 2',
  //     description: 'desc',
  //   },
  // ];
  return { props: { categories } };
};

export default CourseCreatePage;
