import { useQuery } from '@tanstack/react-query';
import { NormalUser, User } from '@prisma/client';
import axios, { AxiosError } from 'axios';

export const useUserQuery = (id: string) => {
  return useQuery<User, AxiosError>(
    ['user', id],
    async () => {
      const { data } = await axios.get(`/api/users/${id}`);
      return data;
    },
    {
      enabled: !!id,
    },
  );
};
