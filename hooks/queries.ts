import { useQuery } from '@tanstack/react-query';
import { NormalUser, User, Admin } from '@prisma/client';
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


export const useAdminQuery = (id:string) => {
  return useQuery<Admin, AxiosError>(
    ['admin', id],
    async () => {
      const {data} = await axios.get(`/api/internal/admin/${id}`);
      return {
        userId:id,
        disabled:data?.disabled,
        role:data?.role};
    },
    {
      enabled: !!id,
    }
  );
};
