import { User, UserType } from '../interfaces';

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: '101', name: 'Alice', email: 'alice@yahoo.com', type: UserType.normalUser },
  { id: '102', name: 'Bob', email: 'bob@gmail.com', type: UserType.admin },
  { id: '103', name: 'Caroline', email: 'caroline@outlook.com', type: UserType.superAdmin },
  { id: '104', name: 'Dave', email: 'dave@hotmail.com', type: UserType.normalUser },
];
