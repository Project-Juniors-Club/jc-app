import React from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../atoms/atoms';

const WelcomeMessage = () => {
  const { name } = useRecoilValue(userInfoState);
  return (
    <section aria-labelledby='course-home-welcome-message' className='mb-6'>
      <h1 id='course-home-welcome-message' className='pb-6 text-5xl font-bold '>
        Welcome back {name}!
      </h1>
      <p className='text-2xl '>Continue your current courses, or find new courses - let’s start learning!</p>
    </section>
  );
};

export default WelcomeMessage;
