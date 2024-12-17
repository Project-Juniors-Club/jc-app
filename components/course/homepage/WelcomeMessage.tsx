import React from 'react';

const WelcomeMessage = ({full_name}) => {
  return (
    <section aria-labelledby='course-home-welcome-message' className='mb-6'>
      <h1 id='course-home-welcome-message' className='pb-6 text-5xl font-bold '>
          { full_name ? `Welcome, ${full_name}!` : 'Welcome to Foodbank!' }
      </h1>
      <p className='text-2xl '>
        Let’s start learning!
      </p>
    </section>
  );
};

export default WelcomeMessage;
