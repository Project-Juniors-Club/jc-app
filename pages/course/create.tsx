import Image from 'next/image';
import { Category } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import CustomButton from '../../components/Buttons';
import Modal from '../../components/Modal';
import { ButtonGroup, ModalBody, ModalFooter, useDisclosure, Text } from '@chakra-ui/react';
import { TextInput } from '../../components/course/create/TextInput';
import { TextAreaInput } from '../../components/course/create/TextAreaInput';
import { CategorySelect } from '../../components/course/create/CategorySelect';
import { UploadButton } from '../../components/course/create/UploadButton';
import { PriceInput } from '../../components/course/create/PriceInput';
import { CancelModal } from '../../components/course/create/CancelModal';
import { useRef } from 'react';

type FormValues = {
  title: string;
  learningObjectives: string;
  description: string;
};

type Props = {
  categories: Category[];
};

const CourseCreatePage = ({ categories }: Props) => {
  const { register, handleSubmit, control, resetField } = useForm();
  const submitRef = useRef(null);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
  };

  const onSubmitAndRedirect: SubmitHandler<FormValues> = data => {
    console.log(data);
  };

  return (
    <div className='px-[9.375rem]'>
      <header className='font-header py-16 text-5xl font-bold'>Create Course</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-y-6'>
          <TextInput label='title' headerText='Course Title' register={register} options={{ required: true, pattern: /^\S.*\S$/ }} />
          <TextAreaInput
            label='description'
            headerText='Course Description'
            register={register}
            options={{ required: true, pattern: /^\S.*\S$/ }}
          />
          <TextAreaInput
            label='learningObjectives'
            headerText='Course Learning Objectives'
            register={register}
            options={{ required: true, pattern: /^\S.*\S$/ }}
          />
          <CategorySelect categories={categories} name='categories' control={control} />
          <UploadButton
            register={register}
            resetField={resetField}
            label={'coverImage'}
            headerText={'Course Cover Image Upload'}
            buttonText={'Upload Image'}
          />
          <PriceInput register={register} />
        </div>
        <div className='flex w-full justify-between py-8'>
          <div className='flex gap-x-3'>
            <CustomButton variant={'black-solid'} onClick={handleSubmit(onSubmit)}>
              <div className='text-[#FFFFFF]'>Save & Exit</div>
            </CustomButton>
            <CustomButton
              variant={'black-outline'}
              onClick={e => {
                e.preventDefault();
                onOpen();
              }}
            >
              <div>Cancel</div>
            </CustomButton>
          </div>
          <CustomButton variant={'green-solid'} onClick={handleSubmit(onSubmitAndRedirect)}>
            Next: Edit Course
          </CustomButton>
        </div>
      </form>
      <CancelModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // const categories = await prisma.category.findMany();
  const categories: Category[] = [
    {
      id: '123',
      name: 'Category 1',
      description: 'desc',
    },
    {
      id: '1234',
      name: 'Category 2',
      description: 'desc',
    },
  ];
  return { props: { categories } };
};

export default CourseCreatePage;
