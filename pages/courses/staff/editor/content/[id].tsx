import { GetServerSideProps } from 'next';
import React from 'react';
import { Text, Box, Button, Grid, GridItem, Divider } from '@chakra-ui/react';
import { Center, HStack, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NavBarCart from '../../../../../components/navbar/NavBarCart';
import MyAccordion from '../../../../../components/course/content/editor/MyAccordion';
import Footer from '../../../../../components/Footer';
import { CourseStructure, getCourseStructure } from '../../../../../lib/server/course';

type Props = {
  id: string;
  courseStructure: CourseStructure;
};

const EditContentChapter = ({ id, courseStructure }: Props) => {
  const session = useSession();

  return (
    <div>
      <NavBarCart />
      <div className='min-h-max px-[9.375rem] font-open-sans'>
        <header className='py-16 text-5xl font-bold'>Edit Course Content</header>
        <Grid templateColumns='repeat(5, 1fr)' gap={20} mb={20}>
          <GridItem>
            <VStack spacing='20px'>
              <Center minH='max-content'>
                <Box mt={4}>
                  <MyAccordion isChapterSelected={true} selectedId={id} courseStructure={courseStructure} />
                  <Box mt={4}>
                    <HStack>
                      <Button
                        background='#A9D357'
                        onClick={() => {
                          console.log(session);
                        }}
                      >
                        Save Course Content & Exit
                      </Button>
                      <Button background='#4D4D4D' color='white'>
                        Cancel
                      </Button>
                    </HStack>
                  </Box>
                </Box>
              </Center>
            </VStack>
          </GridItem>
          <Center>
            <Divider orientation='vertical' />
          </Center>
          <GridItem>
            <VStack spacing='20px' w='400px'>
              <Text as='i'>No chapter or page has been created yet.</Text>
            </VStack>
          </GridItem>
        </Grid>
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
