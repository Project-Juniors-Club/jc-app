import { User, UserType, Admin } from '../interfaces';

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: '101', name: 'Alice', email: 'alice@yahoo.com', type: UserType.normalUser, emailVerified: null, image: null },
  { id: '102', name: 'Bob', email: 'bob@gmail.com', type: UserType.admin, emailVerified: null, image: null },
  { id: '103', name: 'Caroline', email: 'caroline@outlook.com', type: UserType.admin, emailVerified: null, image: null },
  { id: '104', name: 'Dave', email: 'dave@hotmail.com', type: UserType.normalUser, emailVerified: null, image: null },
];

export const sampleAdminData: Admin[] = [
  { userId: '201', name: 'Edward', email: 'edward@yahoo.com', type: UserType.courseEditor, disabled: true, role: 'Manager' },
  { userId: '202', name: 'France', email: 'france@gmail.com', type: UserType.admin, disabled: false, role: 'CEO' },
];
