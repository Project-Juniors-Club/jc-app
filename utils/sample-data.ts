import { User, UserType } from '../interfaces';
import * as dotenv from 'dotenv';

dotenv.config();

const sampleDataPwList = process.env.SAMPLE_DATA_PW_LIST;
const [alicePw, bobPw, carolinePw, davePw] = sampleDataPwList.split(", ");

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: '101', username: 'Alice', email: 'alice@yahoo.com', password: alicePw, type: UserType.normalUser },
  { id: '102', username: 'Bob', email: 'bob@gmail.com', password: bobPw, type: UserType.admin },
  { id: '103', username: 'Caroline', email: 'caroline@outlook.com', password: carolinePw, type: UserType.superAdmin },
  { id: '104', username: 'Dave', email: 'dave@hotmail.com', password: davePw, type: UserType.normalUser },
];
