import { User, UserType } from '../interfaces'

const sampleDataPwArray = process.env.SAMPLE_DATA_PW_ARRAY;
const [alicePw, bobPw, carolinePw, davePw] = Array.from(sampleDataPwArray);

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: '101', username: 'Alice', email: 'alice@yahoo.com', password: alicePw, type: UserType.normalUser},
  { id: '102', username: 'Bob', email: 'bob@gmail.com', password: bobPw, type: UserType.admin },
  { id: '103', username: 'Caroline', email: 'caroline@outlook.com', password: carolinePw, type: UserType.superAdmin },
  { id: '104', username: 'Dave', email: 'dave@hotmail.com', password: davePw, type: UserType.normalUser },
]
