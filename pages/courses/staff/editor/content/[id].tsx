import { GetServerSideProps } from 'next';
import React from 'react';
import { Text, Box, Grid, GridItem, Divider, Flex } from '@chakra-ui/react';
import { Center, HStack, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NavBarCart from '../../../../../components/navbar/NavBarCart';
import MyAccordion from '../../../../../components/course/content/editor/MyAccordion';
import Footer from '../../../../../components/Footer';
import Button from '../../../../../components/Button';
import { CourseStructure, getCourseStructure } from '../../../../../lib/server/course';

type Props = {
  id: string;
  courseStructure: CourseStructure;
};

const EditContentChapter = ({ id, courseStructure }: Props) => {
  return (
    <div>
      <NavBarCart />
      <div className='min-h-max px-[9.375rem] font-open-sans'>
        <header className='py-16 text-5xl font-bold'>Edit Course Content</header>
        <Flex>
          <Box minW='393px'>
            <MyAccordion isChapterSelected={true} selectedId={id} courseStructure={courseStructure} />
          </Box>
          <Box ml='2.25rem' pl='3.5rem' py='1.625rem' borderLeft='1px' borderLeftColor='#C7C7C7'>
            <Text as='i'>No chapter or page has been selected.</Text>
          </Box>
        </Flex>
        <HStack py='3.5rem'>
          <Button>Save Course Content & Exit</Button>
          <Button variant='black-outline'>Cancel</Button>
        </HStack>
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async req => {
  const id = req.query.id as string;
  const courseStructure: CourseStructure = await getCourseStructure(id);

  return { props: { id, courseStructure } };
};

export default EditContentChapter;
