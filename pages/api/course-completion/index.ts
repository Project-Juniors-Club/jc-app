import { NextApiRequest, NextApiResponse } from 'next';
import { isChapterCompleted, isPageCompleted } from '../../../lib/server/userCourses';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userCourseId, chapters } = req.body;

  if (!userCourseId || !chapters) {
    return res.status(400).json({ error: 'Missing userCourseId or chapters' });
  }

  const chapterStatus = {};
  const pageStatus = {};

  for (const chapter of chapters) {
    const chapterCompleted = await isChapterCompleted(userCourseId, chapter.id);
    chapterStatus[chapter.id] = chapterCompleted;

    for (const page of chapter.pages) {
      const pageCompleted = await isPageCompleted(userCourseId, page.id);
      pageStatus[`${chapter.id}-${page.id}`] = pageCompleted;
    }
  }

  res.status(200).json({ chapterStatus, pageStatus });
}
