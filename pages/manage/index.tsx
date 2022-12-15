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
        <Input isDisabled={isDisabled} id='email' label='Email' />
        <Input isDisabled={isDisabled} id='full-name' label='Full Name' />
        <Input isDisabled={isDisabled} id='date-of-birth' label='Date of Birth' />
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
