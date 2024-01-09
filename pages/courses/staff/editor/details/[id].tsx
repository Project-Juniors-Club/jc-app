import { Asset, AssetType, Category, CourseStatus } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { FieldValues, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useDisclosure } from '@chakra-ui/react';
import TextInput from '../../../../../components/course/create/TextInput';
import TextAreaInput from '../../../../../components/course/create/TextAreaInput';
import CategorySelect from '../../../../../components/course/create/CategorySelect';
import UploadButton from '../../../../../components/course/create/UploadButton';
import PriceInput from '../../../../../components/course/create/PriceInput';
import CancelModal from '../../../../../components/course/create/CancelModal';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import useSnackbar from '../../../../../hooks/useSnackbar';
import { useState } from 'react';
import prisma from '../../../../../lib/prisma';
import NavBarCart from '../../../../../components/navbar/NavBarCourse';
import Footer from '../../../../../components/Footer';
import uploadFile from '../../../../../lib/upload';
import Button from '../../../../../components/Button';
import {
  findCourse,
  getCourseWithCoverImage,
  serializeCourse,
  SerializedCourse,
  SerializedCourseWithCoverImage,
} from '../../../../../lib/server/course';
import { Admin } from '../../../../../interfaces';
import EditorSelect from '../../../../../components/course/create/EditorSelect';

type FormValues = {
  title: string;
  learningObjectives: string;
  description: string;
  category: Category;
  editor: Admin;
  coverImage: File[];
  isFree: string;
  price: number;
  deleteImage: boolean;
  originalCoverImage: string;
};

type Props = {
  categories: Category[];
  editors: Admin[];
  sess: Session;
  course: SerializedCourseWithCoverImage;
};

const CourseDetailsEditPage = ({ categories, editors, sess, course }: Props) => {
  const router = useRouter();
  const { openSuccessNotification, openErrorNotification } = useSnackbar();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { isSubmitting, errors, isSubmitSuccessful },
    watch,
    setValue,
  } = useForm();

  const defaultCategory = categories.find(category => category.id == course.categoryId) || {
    id: undefined,
    name: undefined,
    description: undefined,
  };

  // Assumes 1 editor, change if has multiple editors
  const defaultEditor = editors.find(editor => editor.userId == course.courseEditor?.find(x => true).adminId) || {
    userId: undefined,
    user: {
      username: undefined,
    },
  };

  register('originalCoverImage', { value: course.coverImage?.filename });
  const removeOriginalCoverImage = () => setValue('originalCoverImage', false);
  const coverImageFilename = watch('originalCoverImage', course.coverImage?.filename);

  const isDisabled = isSubmitting || isSubmitSuccessful;

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const { title, description, learningObjectives, isFree, category, editor, coverImage } = data;

    const coverImageAssetId =
      coverImage.length > 0 ? await uploadFile(coverImage[0]) : coverImageFilename ? course.coverImageAssetId : null;

    // returns id of course created
    return await axios
      .put(`/api/courses/${course.id}`, {
        title: title.trim(),
        description: description.trim(),
        learningObjectives: learningObjectives.trim(),
        coverImageAssetId: coverImageAssetId,
        updaterId: sess.user.id,
        price: +isFree ? 0 : data?.price,
        categoryId: category?.id,
        editorId: editor?.userId,
        status: CourseStatus.DRAFT,
        coverImageRemoved: course.coverImageAssetId && !coverImageFilename, // removed
      })
      .then(resp => resp.data.data.id);
  };

  const onSubmitAndRedirectCourseOverview: SubmitHandler<FormValues> = async data => {
    try {
      const courseId = await onSubmit(data);
      openSuccessNotification('Course Updating Successful', 'Redirecting to the course details page');
      router.push(`/courses/staff/${courseId}`);
    } catch (err) {
      console.log(err);
      openErrorNotification('Course Updating Failed', 'Please try again');
      throw err;
    }
  };

  return (
    <div>
      <NavBarCart />
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
              isDisabled={isDisabled}
              errors={errors}
              defaultValue={course.title}
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
              isDisabled={isDisabled}
              errors={errors}
              defaultValue={course.description}
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
              isDisabled={isDisabled}
              errors={errors}
              defaultValue={course.learningObjectives}
            />
            <CategorySelect
              categories={categories}
              name='category'
              control={control}
              disabled={isDisabled}
              defaultCategory={defaultCategory}
            />
            <EditorSelect editors={editors} name='editor' control={control} disabled={isDisabled} defaultEditor={defaultEditor} />
            <UploadButton
              register={register}
              resetField={resetField}
              label={'coverImage'}
              headerText={'Course Cover Image Upload'}
              buttonText={'Upload Image'}
              isDisabled={isDisabled}
              watch={watch}
              removeCoverImageOnClick={removeOriginalCoverImage}
              coverImageFilename={coverImageFilename}
            />
            <PriceInput register={register} errors={errors} isDisabled={isDisabled} defaultPrice={course.price} />
          </div>
          <div className='flex w-full justify-between py-8'>
            <div className='flex gap-x-3'>
              <Button variant={'black-solid'} onClick={handleSubmit(onSubmitAndRedirectCourseOverview)} isDisabled={isDisabled}>
                <div className='text-[#FFFFFF]'>Save & Exit</div>
              </Button>
              <Button
                variant={'black-outline'}
                onClick={e => {
                  e.preventDefault();
                  onOpen();
                }}
                isDisabled={isDisabled}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
        <CancelModal isOpen={isOpen} onClose={onClose} isCentered={true} exitOnClick={() => router.push(`/courses/staff/${course.id}`)} />
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async req => {
  const id = req.query.id as string;
  const course = serializeCourse(await getCourseWithCoverImage({ id })) as SerializedCourseWithCoverImage;
  const sess = await getSession(req);
  const categories = await prisma.category.findMany();
  const admins = await prisma.admin.findMany({
    include: {
      user: true,
    },
  });

  const editors = admins.map(admin => {
    const editor = {
      userId: admin.userId,
      user: {
        username: admin.user.name,
      },
    };

    return editor;
  });

  return { props: { categories, editors, sess, course } };
};

export default CourseDetailsEditPage;
