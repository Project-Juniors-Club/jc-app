import NavBarCart from '../../components/navbar/NavBarCart';
import CustomButton from '../../components/Buttons';
import { useState } from 'react';
import Input from '../../components/Input';

const Manage = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <>
      <NavBarCart />
      <h1 className='my-10 text-center text-3xl font-bold'> Account Details </h1>
      <div className='align grid place-items-center'>
        <div className='mb-5 flex w-full flex-col items-center justify-center'>
          <Input isDisabled={isDisabled} id='email' label='Email' />
          <Input isDisabled={isDisabled} id='full-name' label='Full Name' />
          <Input isDisabled={isDisabled} id='date-of-birth' label='Date of Birth' />
        </div>
        <div className='flex flex-row space-x-7'>
          {isDisabled ? (
            <CustomButton variant='green-solid' onClick={() => setIsDisabled(!isDisabled)}>
              <h3 className='min-w-full text-base'>Edit Details</h3>
            </CustomButton>
          ) : (
            <CustomButton variant='green-solid' onClick={() => setIsDisabled(!isDisabled)}>
              <h3 className='text-base'>Confirm Changes</h3>
            </CustomButton>
          )}
          <CustomButton variant='black-solid'>
            <h3 className='text-base text-white'>Delete Account</h3>
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default Manage;
