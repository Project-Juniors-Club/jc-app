import NavBarCart from '../../components/navbar/NavBarCart';
import CustomButton from '../../components/Buttons';
import { useState } from 'react';

const Manage = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <>
      <NavBarCart />
      <h1 className='my-10 text-center text-3xl font-bold'> Account Details </h1>
      <div className='align grid place-items-center'>
        <label htmlFor='email' className='mb-2 block text-sm text-gray-900'>
          Email
        </label>
        <input
          type='text'
          id='email'
          aria-label='email'
          className={
            (isDisabled ? 'bg-gray-100' : 'bg-white') +
            ' mb-6 block w-2/6 w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
          }
          disabled={isDisabled}
        />
        <label htmlFor='full-name' className='mb-2 block text-sm text-gray-900'>
          Full Name
        </label>
        <input
          type='text'
          id='full-name'
          aria-label='full-name'
          className={
            (isDisabled ? 'bg-gray-100' : 'bg-white') +
            ' mb-6 block w-2/6 w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
          }
          disabled={isDisabled}
        />
        <label htmlFor='date-of-birth' className='mb-2 block text-sm text-gray-900'>
          Date of Birth
        </label>
        <input
          type='text'
          id='date-of-birth'
          aria-label='date-of-birth'
          className={
            (isDisabled ? 'bg-gray-100' : 'bg-white') +
            ' mb-10 block w-2/6 w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
          }
          disabled={isDisabled}
        />
        <div>
          {isDisabled ? (
            <CustomButton className='w-full' variant='green-solid' onClick={() => setIsDisabled(!isDisabled)}>
              <h1>Edit Details</h1>
            </CustomButton>
          ) : (
            <CustomButton className='w-full' variant='green-solid' onClick={() => setIsDisabled(!isDisabled)}>
              <h1>Confirm Changes</h1>
            </CustomButton>
          )}
          <CustomButton className='' variant='black-solid'>
            <h1 className='text-white'>Delete Account</h1>
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default Manage;
