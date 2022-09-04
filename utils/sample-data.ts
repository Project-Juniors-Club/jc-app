import { User, UserType } from '../interfaces'

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: '101', username: 'Alice', email: 'alice@yahoo.com', password: 'a1s2d3f4', type: UserType.normalUser},
  { id: '102', username: 'Bob', email: 'bob@gmail.com', password: 'g5h6j7k8', type: UserType.admin },
  { id: '103', username: 'Caroline', email: 'caroline@outlook.com', password: 'z8x9c0v0', type: UserType.superAdmin },
  { id: '104', username: 'Dave', email: 'dave@hotmail.com', password: 'm5n4b232', type: UserType.normalUser },
]
