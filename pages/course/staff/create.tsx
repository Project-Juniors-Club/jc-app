import { Asset, AssetType, Category } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import CustomButton from '../../../components/Buttons';
import { useDisclosure } from '@chakra-ui/react';
import { TextInput } from '../../../components/course/create/TextInput';
import { TextAreaInput } from '../../../components/course/create/TextAreaInput';
import { CategorySelect } from '../../../components/course/create/CategorySelect';
import { UploadButton } from '../../../components/course/create/UploadButton';
import { PriceInput } from '../../../components/course/create/PriceInput';
import { CancelModal } from '../../../components/course/create/CancelModal';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import useSnackbar from '../../../hooks/useSnackbar';
import { useState } from 'react';
import prisma from '../../../lib/prisma';

type FormValues = {
  title: string;
  learningObjectives: string;
  description: string;
  category: Category;
  coverImage: File[];
  isFree: string;
  price: number;
};

type Props = {
  categories: Category[];
  sess: Session;
};

const CourseCreatePage = ({ categories, sess }: Props) => {
  const router = useRouter();
  const { openSuccessNotification, openErrorNotification } = useSnackbar();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [file, setFile] = useState<File>();
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { isSubmitting, errors },
  } = useForm();

  // returns course id created
  const onSubmit: SubmitHandler<FormValues> = async data => {
    const { title, description, learningObjectives, isFree, category } = data;
    const status = 'DRAFT';

    // TODO: update when we have image upload mechanism
    const coverImageAssetId = undefined;
    // const coverImageAssetId = file ? await uploadImage(file) : undefined;
    // if (file && !coverImageAssetId) {
    //   throw 'Image upload failed, please try again.';
    // }

    const userId = sess.user.id;
    const price = +isFree ? 0 : data.price;

    const toSend = {
      title: title,
      description: description,
      learningObjectives: learningObjectives,
      coverImageAssetId: coverImageAssetId,
      creatorId: userId,
      price: price,
      categoryId: category.id,
      status: status,
    };

    // returns id of course created
    return await axios
      .post('/api/courses', {
        ...toSend,
      })
      .then(resp => resp.data.data.id);
  };

  const onSubmitAndRedirectCourseOverview: SubmitHandler<FormValues> = async data => {
    try {
      const courseId = await onSubmit(data);
      openSuccessNotification('Course Creation Successful', 'Redirecting to the course details page');
      router.push(`/course/staff/${courseId}`);
    } catch (err) {
      openErrorNotification('Course Creation Failed', err);
    }
  };

  const onSubmitAndRedirectCourseEditor: SubmitHandler<FormValues> = async data => {
    try {
      const courseId = await onSubmit(data);
      openSuccessNotification('Course Creation Successful', 'Redirecting to the course editor page');
      router.push(`/course/staff/editor/${courseId}`);
    } catch (err) {
      openErrorNotification('Course Creation Failed', err);
    }
  };

  return (
    <div className='px-[9.375rem] font-open-sans'>
      <header className='py-16 text-5xl font-bold'>Create Course</header>
      <form>
        <div className='grid gap-y-6'>
          <TextInput
            label='title'
            headerText='Course Title'
            register={register}
            options={{
              required: 'This is required',
              pattern: {
                value: /(.|\s)*\S(.|\s)*/,
                message: 'This is required',
              },
            }}
            isDisabled={isSubmitting}
            errors={errors}
          />
          <TextAreaInput
            label='description'
            headerText='Course Description'
            register={register}
            options={{
              required: 'This is required',
              pattern: {
                value: /(.|\s)*\S(.|\s)*/,
                message: 'This is required',
              },
            }}
            isDisabled={isSubmitting}
            errors={errors}
          />
          <TextAreaInput
            label='learningObjectives'
            headerText='Course Learning Objectives'
            register={register}
            options={{
              required: 'This is required',
              pattern: {
                value: /(.|\s)*\S(.|\s)*/,
                message: 'This is required',
              },
            }}
            isDisabled={isSubmitting}
            errors={errors}
          />
          <CategorySelect categories={categories} name='category' control={control} disabled={isSubmitting} />
          <UploadButton
            register={register}
            resetField={resetField}
            label={'coverImage'}
            headerText={'Course Cover Image Upload'}
            buttonText={'Upload Image'}
            isDisabled={isSubmitting}
            file={file}
            setFile={setFile}
          />
          <PriceInput register={register} errors={errors} isDisabled={isSubmitting} />
        </div>
        <div className='flex w-full justify-between py-8'>
          <div className='flex gap-x-3'>
            <CustomButton variant={'black-solid'} onClick={handleSubmit(onSubmitAndRedirectCourseOverview)} isDisabled={isSubmitting}>
              <div className='text-[#FFFFFF]'>Save & Exit</div>
            </CustomButton>
            <CustomButton
              variant={'black-outline'}
              onClick={e => {
                e.preventDefault();
                onOpen();
              }}
              isDisabled={isSubmitting}
            >
              Cancel
            </CustomButton>
          </div>
          <CustomButton variant={'green-solid'} onClick={handleSubmit(onSubmitAndRedirectCourseEditor)} isDisabled={isSubmitting}>
            Next: Edit Course
          </CustomButton>
        </div>
      </form>
      <CancelModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async req => {
  const sess = await getSession(req);
  const categories = await prisma.category.findMany();
  return { props: { categories, sess } };
};

export default CourseCreatePage;
