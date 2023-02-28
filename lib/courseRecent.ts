import axios from 'axios';

export const updateLastSeen = async (userId: string, courseId: string) => {
  const result = await axios.post('/api/courses/recent', { userId, courseId });
  return result.data.data;
};

export const getRecentCourses = async (userId: string) => {
  const result = await axios.get('/api/courses/recent', { params: { userId } });
  return result.data.data;
};
