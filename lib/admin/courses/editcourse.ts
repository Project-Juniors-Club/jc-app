import { Course, Chapter, Page, PageItem, PrismaClient, Asset } from '@prisma/client';

const prisma = new PrismaClient();

export type CourseStructure = Course & {
  chapters: (Chapter & {
    pages: (Page & {
      pageItems: PageItem[];
    })[];
  })[];
};

export const loadCourse = async (id: string): Promise<CourseStructure> => {
  const course = await prisma.course.findUnique({
    where: {
      id: id,
    },
    include: {
      chapters: {
        include: {
          pages: {
            include: {
              pageItems: { orderBy: { pageItemNumber: 'asc' } },
            },
            orderBy: {
              pageNumber: 'asc',
            },
          },
        },
        orderBy: {
          chapterNumber: 'asc',
        },
      },
    },
  });
  return course;
};

// only course.id matters, the other ids will be deleted, and the numbering will be renumbered
// this is probably not the best way to go about it
export const saveCourse = async (course: CourseStructure) => {
  await prisma.course.update({
    where: {
      id: course.id,
    },
    data: {
      name: course.name,
      description: course.description,
      stars: course.stars,
      createdBy: {
        connect: {
          userId: course.adminId,
        },
      },
      price: course.price,
      status: course.status,
      subcategory: {
        connect: {
          id: course.subcategoryId,
        },
      },
    },
  });

  // renumber them, so that after storing, orders are preserved
  course.chapters.forEach((chapter, idx) => {
    chapter.chapterNumber = idx;
    chapter.pages.forEach((page, idx) => {
      page.pageNumber = idx;
      page.pageItems.forEach((pageItem, idx) => {
        pageItem.pageItemNumber = idx;
      });
    });
  });

  // with onDelete: cascade, everything related will be deleted
  await prisma.chapter.deleteMany({ where: { courseId: course.id } });

  course.chapters.forEach(async chapter => {
    const newChapter = await prisma.chapter.create({
      data: {
        name: chapter.name,
        description: chapter.description,
        chapterNumber: chapter.chapterNumber,
        course: {
          connect: { id: course.id },
        },
      },
    });
    chapter.pages.forEach(async page => {
      const newPage = await prisma.page.create({
        data: {
          name: page.name,
          description: page.description,
          pageNumber: page.pageNumber,
          duration: page.duration,
          assetType: page.assetType,
          Chapter: {
            connect: { id: newChapter.id },
          },
        },
      });
      page.pageItems.forEach(async pageItem => {
        await prisma.pageItem.create({
          data: {
            pageItemNumber: pageItem.pageItemNumber,
            assetType: pageItem.assetType,
            caption: pageItem.caption,
            asset: {
              connect: { id: pageItem.assetId },
            },
            page: {
              connect: { id: newPage.id },
            },
          },
        });
      });
    });
  });
};
