// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import internal from "stream";

export type User = {
  pk: number;
  username: string;
  email: string;
  password: string;
};


export type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: {
    username: string;
  };
}
